import React, { useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './PublishModal.module.scss';
import { ReactComponent as ImageIcon } from '../../assets/image.svg';
import { ReactComponent as WorldIcon } from '../../assets/world.svg';
import { ReactComponent as LockIcon } from '../../assets/lock.svg';
import { ReactComponent as ListAddIcon } from '../../assets/list_add.svg';
import { postDetail } from '../../contexts/types';

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
  const [isPublic, setPublic] = useState(true);
  const [seriesActive, setSeriesActive] = useState(false);
  const [curSeries, setCurSeries] = useState(0);
  const [newSeriesActive, setNewSeriesActive] = useState(false);
  const [newSeriesStart, setNewSeriesStart] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
    setPublic(true);
  };

  const onPrivateClick = () => {
    setPublic(false);
  };

  const onSeriesClick = () => {
    setSeriesActive(true);
  };

  const onSeriesCancelClick = () => {
    setSeriesActive(false);
    setCurSeries(0);
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
                <h4>rer</h4>
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
                      />
                      {(newSeriesStart || newSeriesActive) && (
                        <div
                          className={cx('add_series_container', {
                            hide: !newSeriesActive,
                          })}
                        >
                          <div className={styles.url_container}>
                            <span>/fef/</span>
                            <input name="urlSlug" />
                          </div>
                          <div className={styles.button_container}>
                            <button
                              type="button"
                              className={styles.cancel_button}
                              onClick={onBackgroundClick}
                            >
                              취소
                            </button>
                            <button type="submit" className={styles.add_button}>
                              시리즈 추가
                            </button>
                          </div>
                        </div>
                      )}
                    </form>
                  </div>
                  <ul className={styles.series_list}>
                    {[1, 2].map(val => (
                      <li
                        className={cx(
                          curSeries === val
                            ? 'selected_element'
                            : 'list_element'
                        )}
                        key={val}
                        value={val}
                        onClick={() => setCurSeries(val)}
                        role="presentation"
                      >
                        test{val}
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
                  disabled={curSeries === 0}
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
                      isPublic ? 'active_button' : 'deactive_button'
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
                      isPublic ? 'deactive_button' : 'active_button'
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
                    <div className={styles.username}>/@username/</div>
                    <input className={styles.url} />
                  </div>
                </div>
              </section>
              <section className={styles.series_setting}>
                <h3>시리즈 설정</h3>
                <div className={styles.contents}>
                  <button
                    type="button"
                    className={styles.series_add_button}
                    onClick={onSeriesClick}
                  >
                    <ListAddIcon className={styles.list_add_svg} />
                    시리즈에 추가하기
                  </button>
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
              <button type="button" className={styles.publish_button}>
                출간하기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
