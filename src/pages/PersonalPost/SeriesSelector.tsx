import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './SeriesSelector.module.scss';
import { ReactComponent as SeriesIcon } from '../../assets/series_mark.svg';
import { ReactComponent as UpTriangleIcon } from '../../assets/up_triangle.svg';
import { ReactComponent as DownTriangleIcon } from '../../assets/down_triangle.svg';
import { ReactComponent as LeftIcon } from '../../assets/left_mark.svg';
import { ReactComponent as RightIcon } from '../../assets/right_mark.svg';
import {
  post,
  postDetail,
  seriesDetail,
  seriesPost,
  user,
} from '../../contexts/types';

export default function SeriesSelector({ post }: { post: postDetail | null }) {
  const [listVisible, setListVisible] = useState(false);
  const navigate = useNavigate();
  const { pid, series }: { pid: number; series: seriesDetail | null } =
    post || { pid: -1, series: null };
  const {
    id,
    series_name: seriesName,
    photo,
    update,
    author,
    postNum,
    postList,
  }: seriesDetail = series || {
    id: -1,
    series_name: '',
    photo: '',
    update: '',
    author: '',
    postNum: 0,
    postList: [],
  };
  const curPostIdx = postList.findIndex(spost => spost.post.pid === pid) + 1;

  const toggleList = () => {
    setListVisible(x => !x);
  };

  const onLeftClick = () => {
    navigate(`/@${author}/${postList[curPostIdx - 2].post.url}`);
  };

  const onRightClick = () => {
    navigate(`/@${author}/${postList[curPostIdx].post.url}`);
  };

  return (
    <div className={styles.series_container}>
      <h2>
        <Link to={`/@${author}/series/${seriesName}`}>{seriesName}</Link>
      </h2>
      <SeriesIcon className={styles.series_mark} />
      {listVisible && (
        <ol className={styles.list}>
          {postList.map(seriesPost => {
            return (
              <li key={seriesPost.post.pid}>
                <Link
                  to={`/@${author}/${seriesPost.post.url}`}
                  style={
                    seriesPost.post.pid === pid
                      ? { color: 'var(--primary1)', fontWeight: 'bold' }
                      : {}
                  }
                >
                  {seriesPost.post.title}
                </Link>
              </li>
            );
          })}
        </ol>
      )}
      <div className={styles.list_actions}>
        <div
          className={styles.see_hide_container}
          onClick={toggleList}
          role="presentation"
        >
          {listVisible ? <UpTriangleIcon /> : <DownTriangleIcon />}
          {listVisible ? '숨기기' : '목록 보기'}
        </div>
        <div className={styles.series_number_container}>
          <div
            className={styles.series_number}
          >{`${curPostIdx}/${postNum}`}</div>
          <div className={styles.button_container}>
            <button
              type="button"
              disabled={curPostIdx === 1}
              onClick={onLeftClick}
            >
              <LeftIcon />
            </button>
            <button
              type="button"
              disabled={curPostIdx === postNum}
              onClick={onRightClick}
            >
              <RightIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
