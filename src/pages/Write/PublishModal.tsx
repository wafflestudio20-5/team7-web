import React, { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import styles from './PublishModal.module.scss';
import { ReactComponent as ImageIcon } from '../../assets/image.svg';
import { ReactComponent as WorldIcon } from '../../assets/world.svg';
import { ReactComponent as LockIcon } from '../../assets/lock.svg';
import { ReactComponent as ListAddIcon } from '../../assets/list_add.svg';
import { ReactComponent as SettingIcon } from '../../assets/setting.svg';
import { postDetail, series } from '../../contexts/types';
import { showToast } from '../../components/Toast';
import { useLoginValue } from '../../contexts/LoginProvider';

type postPostType = {
  series: number | null;
  title: string;
  preview: string | null;
  content: string;
  is_private: boolean;
  create_tag: string | null;
  url: string | null;
};

const cx = classNames.bind(styles);

interface PublishModalProps {
  post: postDetail;
  setPost: React.Dispatch<React.SetStateAction<postDetail>>;
  modalActive: boolean;
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PublishModal({
  post,
  setPost,
  modalActive,
  setModalActive,
}: PublishModalProps) {
  const [thumbnailActive, setThumbnailActive] = useState(false);
  const [seriesActive, setSeriesActive] = useState(false);
  const [curSeries, setCurSeries] = useState(-1);
  const [newSeriesActive, setNewSeriesActive] = useState(false);
  const [newSeriesStart, setNewSeriesStart] = useState(false);
  const [newSeriesTitle, setNewSeriesTitle] = useState('');
  const [newSeriesUrl, setNewSeriesUrl] = useState('');
  const [seriesUrlSync, setSeriesUrlSync] = useState(true);
  const [seriesList, setSeriesList] = useState<series[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useLoginValue();

  const getSeriesList = useCallback(async () => {
    if (!user) return;

    try {
      const response = await axios.get(
        `/api/v1/velog/@${user.username}/series/`
      );
      setSeriesList(response.data);
    } catch (error) {
      showToast({
        type: 'error',
        message: '시리즈 로드에 실패하였습니다. 새로고침 해주세요.',
      });
      console.log(error);
    }
  }, [user]);

  useEffect(() => {
    getSeriesList();
  }, [getSeriesList]);

  useEffect(() => {
    if (post.series) {
      setCurSeries(post.series.id);
    }
  }, [post]);

  const onCancelClick = () => {
    setModalActive(false);
  };

  const onDeleteClick = () => {
    setThumbnailActive(false);
    setPost(post => {
      return { ...post, thumbnail: '' };
    });
  };

  const onUploadClick = () => {
    setThumbnailActive(true);
    fileInputRef.current?.click();
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost(post => {
      return {
        ...post,
        thumbnail: e.target.files ? URL.createObjectURL(e.target.files[0]) : '',
      };
    });
  };

  const onPreviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 150) {
      e.target.value = e.target.value.slice(0, 150);
    }

    setPost(post => {
      return {
        ...post,
        preview: e.target.value,
      };
    });
  };

  const onPublicClick = () => {
    setPost(post => {
      return {
        ...post,
        is_private: false,
      };
    });
  };

  const onPrivateClick = () => {
    setPost(post => {
      return {
        ...post,
        is_private: true,
      };
    });
  };

  const onUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost(post => {
      return {
        ...post,
        url: e.target.value,
      };
    });
  };

  const onSeriesClick = () => {
    setSeriesActive(true);
  };

  const onSeriesCancelClick = () => {
    setSeriesActive(false);
    setCurSeries(post.series?.id || -1);
    setNewSeriesTitle('');
    setNewSeriesUrl('');
    setSeriesUrlSync(true);
  };

  const onNewSeriesClick = () => {
    setNewSeriesStart(true);
    setTimeout(() => setNewSeriesActive(true), 125);
  };

  const onBackgroundClick = () => {
    setNewSeriesActive(false);
    setTimeout(() => setNewSeriesStart(false), 125);
  };

  const preventBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const onNewSeriesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSeriesTitle(e.target.value);
    if (seriesUrlSync) {
      let tempUrl = e.target.value;
      tempUrl = tempUrl.replaceAll(/[ -]+/gi, '-');
      tempUrl = tempUrl.replaceAll(/[~`!@#$%^&*()_+=\\|,<>/?]+/gi, '');
      setNewSeriesUrl(tempUrl);
    }
  };

  const onSeriesUrlFocus = () => {
    setSeriesUrlSync(false);
  };

  const onSeriesUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (seriesUrlSync) return;

    let tempUrl = e.target.value;
    tempUrl = tempUrl.replaceAll(/[ -]+/gi, '-');
    tempUrl = tempUrl.replaceAll(/[~`!@#$%^&*()_+=\\|,<>/?]+/gi, '');
    setNewSeriesUrl(tempUrl);
  };

  const onNewSeriesAddClick = async () => {
    if (seriesList.find(series => series.url === newSeriesUrl) !== undefined) {
      showToast({ type: 'error', message: '이미 존재하는 URL입니다.' });
      onBackgroundClick();
      return;
    }

    if (!user) return;

    try {
      const response = await axios.post(`/api/v1/velog/create_series/`, {
        series_name: newSeriesTitle,
        url: newSeriesUrl,
      });
      setCurSeries(response.data.id);
    } catch (error) {
      console.log(error);
    }

    try {
      const response = await axios.get(
        `/api/v1/velog/@${user.username}/series/`
      );
      setSeriesList(response.data);
    } catch (error) {
      showToast({
        type: 'error',
        message: '시리즈 로드에 실패하였습니다. 새로고침 해주세요.',
      });
      console.log(error);
    }

    setNewSeriesTitle('');
    setNewSeriesUrl('');
    onBackgroundClick();
  };

  const onPublishClick = async () => {
    try {
      const postParams: postPostType = {
        series: curSeries > -1 ? curSeries : null,
        title: post.title,
        preview: post.preview || null,
        content: post.content,
        is_private: post.is_private,
        create_tag: post.create_tag || null,
        url: post.url || null,
      };
      const pid = searchParams.get('id');
      const response =
        pid === null
          ? await axios.post(`/api/v1/velog/write/`, postParams)
          : await axios.put(`/api/v1/velog/write/id=${pid}/`, postParams);

      if (user !== null) navigate(`/@${user.username}/${post.url}`);
    } catch (error) {
      showToast({ type: 'error', message: '다시 시도해주세요.' });
      console.log(error);
    }
  };

  const onSeriesRemoveClick = () => {
    setCurSeries(-1);
  };

  return (
    <div
      className={cx('background', { hide: !modalActive })}
      onClick={onBackgroundClick}
      role="presentation"
    >
      <div className={styles.modal_container}>
        <div className={styles.post_preview_container}>
          <section>
            <h3>포스트 미리보기</h3>
            <div className={styles.contents}>
              {thumbnailActive && (
                <div className={styles.thumbnail_actions_container}>
                  <div className={styles.actions}>
                    <button type="button" onClick={onUploadClick}>
                      재업로드
                    </button>
                    <div className={styles.middledot} />
                    <button type="button" onClick={onDeleteClick}>
                      제거
                    </button>
                  </div>
                </div>
              )}
              <div className={styles.thumbnail_area}>
                <div className={styles.thumbnail_container}>
                  {thumbnailActive ? (
                    <img
                      className={styles.thumbnail}
                      src={post.thumbnail}
                      alt="썸네일"
                    />
                  ) : (
                    <div className={styles.empty_thumbnail}>
                      <ImageIcon />
                      <button type="button" onClick={onUploadClick}>
                        썸네일 업로드
                      </button>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={onFileInputChange}
                  style={{ display: 'none' }}
                />
              </div>
              <div className={styles.summary_container}>
                <h4>{post.title}</h4>
                <textarea
                  className={styles.summary}
                  placeholder="당신의 포스트를 짧게 소개해보세요."
                  value={post.preview}
                  onChange={onPreviewChange}
                />
                <div className={styles.summary_counter}>
                  {post.preview.length}/150
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className={styles.space_between} />
        <div className={styles.right_container}>
          {seriesActive ? (
            <section className={styles.series_detail_container}>
              <h3>시리즈 설정</h3>
              <div className={styles.contents}>
                <div className={styles.series_list_container}>
                  <div onClick={preventBackgroundClick} role="presentation">
                    <form
                      className={cx('new_series_form', {
                        add: newSeriesStart,
                      })}
                    >
                      <input
                        className={styles.new_series_input}
                        placeholder="새로운 시리즈 이름을 입력하세요"
                        name="name"
                        onClick={onNewSeriesClick}
                        value={newSeriesTitle}
                        onChange={onNewSeriesChange}
                      />
                      {(newSeriesStart || newSeriesActive) && (
                        <div
                          className={cx('add_series_container', {
                            hide: !newSeriesActive,
                          })}
                        >
                          <div className={styles.url_container}>
                            <span>/@{user?.username}/</span>
                            <input
                              name="urlSlug"
                              value={newSeriesUrl}
                              onChange={onSeriesUrlChange}
                              onFocus={onSeriesUrlFocus}
                            />
                          </div>
                          <div className={styles.button_container}>
                            <button
                              type="button"
                              className={styles.cancel_button}
                              onClick={onBackgroundClick}
                            >
                              취소
                            </button>
                            <button
                              type="button"
                              className={styles.add_button}
                              onClick={onNewSeriesAddClick}
                            >
                              시리즈 추가
                            </button>
                          </div>
                        </div>
                      )}
                    </form>
                  </div>
                  <ul className={styles.series_list}>
                    {seriesList.map(series => (
                      <li
                        className={cx(
                          curSeries === series.id
                            ? 'selected_element'
                            : 'list_element'
                        )}
                        key={series.id}
                        value={series.id}
                        onClick={() => setCurSeries(series.id)}
                        role="presentation"
                      >
                        {series.series_name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className={styles.series_button_container}>
                <button
                  type="button"
                  className={styles.cancel_button}
                  onClick={onSeriesCancelClick}
                >
                  취소
                </button>
                <button
                  type="button"
                  className={styles.select_button}
                  disabled={curSeries === -1}
                  onClick={() => setSeriesActive(false)}
                >
                  선택하기
                </button>
              </div>
            </section>
          ) : (
            <div>
              <section className={styles.public_setting}>
                <h3>공개 설정</h3>
                <div className={styles.contents}>
                  <button
                    type="button"
                    className={cx(
                      post.is_private ? 'deactive_button' : 'active_button'
                    )}
                    onClick={onPublicClick}
                  >
                    <WorldIcon />
                    <div className={styles.description}>전체 공개</div>
                  </button>
                  <button
                    type="button"
                    className={cx(
                      'private_button',
                      post.is_private ? 'active_button' : 'deactive_button'
                    )}
                    onClick={onPrivateClick}
                  >
                    <LockIcon />
                    <div className={styles.description}>비공개</div>
                  </button>
                </div>
              </section>
              <section className={styles.url_setting}>
                <h3>URL 설정</h3>
                <div className={styles.contents}>
                  <div className={styles.url_box}>
                    <div className={styles.username}>/@{user?.username}/</div>
                    <input
                      className={styles.url}
                      value={post.url}
                      onChange={onUrlChange}
                    />
                  </div>
                </div>
              </section>
              <section className={styles.series_setting}>
                <h3>시리즈 설정</h3>
                <div className={styles.contents}>
                  {curSeries === -1 ? (
                    <button
                      type="button"
                      className={styles.series_add_button}
                      onClick={onSeriesClick}
                    >
                      <ListAddIcon className={styles.list_add_svg} />
                      시리즈에 추가하기
                    </button>
                  ) : (
                    <div className={styles.name_container}>
                      <div className={styles.name_wrapper}>
                        <div className={styles.name}>
                          {
                            seriesList.find(series => series.id === curSeries)
                              ?.series_name
                          }
                        </div>
                      </div>
                      <button type="button" onClick={onSeriesClick}>
                        <SettingIcon />
                      </button>
                    </div>
                  )}
                  {curSeries > -1 && (
                    <div className={styles.series_delete}>
                      <button type="button" onClick={onSeriesRemoveClick}>
                        시리즈에서 제거
                      </button>
                    </div>
                  )}
                </div>
              </section>
            </div>
          )}
          {seriesActive || (
            <div className={styles.button_container}>
              <button
                type="button"
                className={styles.cancel_button}
                onClick={onCancelClick}
              >
                취소
              </button>
              <button
                type="button"
                className={styles.publish_button}
                onClick={onPublishClick}
              >
                출간하기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
