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
  thumbnail: FormData | null | undefined;
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
  tagText: string;
}

export default function PublishModal({
  post,
  setPost,
  modalActive,
  setModalActive,
  tagText,
}: PublishModalProps) {
  const [thumbnailActive, setThumbnailActive] = useState(false);
  const [thumbnailData, setThumbnailData] = useState<FormData | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState('');
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
  const pid = searchParams.get('id');

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
        message: '????????? ????????? ?????????????????????. ???????????? ????????????.',
      });
      console.log(error);
    }
  }, [user]);

  useEffect(() => {
    getSeriesList();
  }, [getSeriesList]);

  useEffect(() => {
    setCurSeries(post.series?.id || -1);
    if (post.thumbnail) {
      setThumbnailActive(true);
      setThumbnailUrl(post.thumbnail);
    }
  }, [post]);

  const onCancelClick = () => {
    setModalActive(false);
  };

  const onDeleteClick = () => {
    setThumbnailActive(false);
    setThumbnailData(null);
    setThumbnailUrl('');
  };

  const onUploadClick = () => {
    setThumbnailActive(true);
    fileInputRef.current?.click();
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('thumbnail', file);
    const value = [
      {
        title: file.name,
        content: file.name,
      },
    ];
    const blob = new Blob([JSON.stringify(value)], {
      type: 'application/json',
    });
    formData.append('data', blob);
    setThumbnailData(formData);
    setThumbnailUrl(URL.createObjectURL(e.target.files[0]));
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
      showToast({ type: 'error', message: '?????? ???????????? URL?????????.' });
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
        message: '????????? ????????? ?????????????????????. ???????????? ????????????.',
      });
      console.log(error);
    }

    setNewSeriesTitle('');
    setNewSeriesUrl('');
    onBackgroundClick();
  };

  const onPublishClick = async () => {
    if (tagText) {
      showToast({
        type: 'error',
        message:
          '?????? ????????? ????????? ???????????????. ????????? ????????? ????????? ??????????????????.',
      });
      return;
    }

    try {
      const postParams: postPostType = {
        series: curSeries > -1 ? curSeries : null,
        title: post.title,
        thumbnail: thumbnailData || undefined,
        preview: post.preview || null,
        content: post.content,
        is_private: post.is_private,
        create_tag: post.create_tag || null,
        url: post.url || null,
      };
      if (thumbnailData) {
        thumbnailData.append(
          'series',
          curSeries > -1 ? curSeries.toString() : ''
        );
        thumbnailData.append('title', post.title);
        thumbnailData.append('preview', post.preview || '');
        thumbnailData.append('is_private', post.is_private ? 'true' : 'false');
        thumbnailData.append('content', post.content);
        thumbnailData.append('create_tag', post.create_tag || '');
        thumbnailData.append('url', post.url || '');
      }

      if (!thumbnailUrl) postParams.thumbnail = null;
      const postConfig = thumbnailData
        ? { headers: { 'Content-Type': 'multipart/form-data' } }
        : undefined;

      const response =
        pid === null
          ? await axios.post(
              `/api/v1/velog/write/`,
              thumbnailData || postParams,
              postConfig
            )
          : await axios.patch(
              `/api/v1/velog/write/id=${pid}/`,
              thumbnailData || postParams,
              postConfig
            );

      if (user !== null) navigate(`/@${user.username}/${post.url}`);
    } catch (error) {
      showToast({ type: 'error', message: '?????? ??????????????????.' });
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
            <h3>????????? ????????????</h3>
            <div className={styles.contents}>
              {thumbnailActive && (
                <div className={styles.thumbnail_actions_container}>
                  <div className={styles.actions}>
                    <button type="button" onClick={onUploadClick}>
                      ????????????
                    </button>
                    <div className={styles.middledot} />
                    <button type="button" onClick={onDeleteClick}>
                      ??????
                    </button>
                  </div>
                </div>
              )}
              <div className={styles.thumbnail_area}>
                <div className={styles.thumbnail_container}>
                  {thumbnailActive ? (
                    <img
                      className={styles.thumbnail}
                      src={thumbnailUrl}
                      alt="?????????"
                    />
                  ) : (
                    <div className={styles.empty_thumbnail}>
                      <ImageIcon />
                      <button type="button" onClick={onUploadClick}>
                        ????????? ?????????
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
                  placeholder="????????? ???????????? ?????? ??????????????????."
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
              <h3>????????? ??????</h3>
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
                        placeholder="????????? ????????? ????????? ???????????????"
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
                              ??????
                            </button>
                            <button
                              type="button"
                              className={styles.add_button}
                              onClick={onNewSeriesAddClick}
                            >
                              ????????? ??????
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
                  ??????
                </button>
                <button
                  type="button"
                  className={styles.select_button}
                  disabled={curSeries === -1}
                  onClick={() => setSeriesActive(false)}
                >
                  ????????????
                </button>
              </div>
            </section>
          ) : (
            <div>
              <section className={styles.public_setting}>
                <h3>?????? ??????</h3>
                <div className={styles.contents}>
                  <button
                    type="button"
                    className={cx(
                      post.is_private ? 'deactive_button' : 'active_button'
                    )}
                    onClick={onPublicClick}
                  >
                    <WorldIcon />
                    <div className={styles.description}>?????? ??????</div>
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
                    <div className={styles.description}>?????????</div>
                  </button>
                </div>
              </section>
              <section className={styles.url_setting}>
                <h3>URL ??????</h3>
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
                <h3>????????? ??????</h3>
                <div className={styles.contents}>
                  {curSeries === -1 ? (
                    <button
                      type="button"
                      className={styles.series_add_button}
                      onClick={onSeriesClick}
                    >
                      <ListAddIcon className={styles.list_add_svg} />
                      ???????????? ????????????
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
                        ??????????????? ??????
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
                ??????
              </button>
              <button
                type="button"
                className={styles.publish_button}
                onClick={onPublishClick}
              >
                {pid === null ? '????????????' : '????????????'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
