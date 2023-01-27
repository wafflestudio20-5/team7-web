import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './SeriesSelector.module.scss';
import { ReactComponent as SeriesIcon } from '../../assets/series_mark.svg';
import { ReactComponent as UpTriangleIcon } from '../../assets/up_triangle.svg';
import { ReactComponent as DownTriangleIcon } from '../../assets/down_triangle.svg';
import { ReactComponent as LeftIcon } from '../../assets/left_mark.svg';
import { ReactComponent as RightIcon } from '../../assets/right_mark.svg';
import { post, seriesDetail, seriesPost, user } from '../../contexts/types';

const dummyUser: user = {
  id: 'id',
  velog_name: 'velog',
  email: 'mail',
  username: 'name',
  userImg:
    'https://velog.velcdn.com/images/shinhw371/profile/2a470881-5a62-429f-97fb-c449c2dc1911/social_profile.png',
  description: 'desc',
  github: 'git',
  twitter: 'twit',
  facebook: 'face',
  homepage: 'home',
  mail: 'mail',
};

const dummyPost: post = {
  id: 1,
  title: 'title',
  author: dummyUser,
  url: '/userid/posttitle',
  preview: 'preview',
  thumbnail: 'thm',
  tags: ['tag1', 'tag2', 'tag3'],
  created_at: '2020-02-20 20:20:20',
  updated_at: '2020-02-20 20:20:20',
  comments: 2,
  likes: 77,
  is_private: false,
};

const dummySeriesPost: seriesPost = {
  series_id: 1,
  post: dummyPost,
};
const dummySeriesPost2: seriesPost = {
  series_id: 2,
  post: dummyPost,
};

const dummySeriesDetail: seriesDetail = {
  id: 1,
  title: 'series',
  photo: 'photo',
  update: '2020-02-20 20:20:20',
  authorId: 'id',
  postNum: 2,
  postList: [dummySeriesPost, dummySeriesPost2],
};

export default function SeriesSelector() {
  const [listVisible, setListVisible] = useState(false);

  const toggleList = () => {
    setListVisible(x => !x);
  };

  return (
    <div className={styles.series_container}>
      <h2>
        <Link
          to={`/@${dummySeriesDetail.authorId}/series/${dummySeriesDetail.title}`}
        >
          {dummySeriesDetail.title}
        </Link>
      </h2>
      <SeriesIcon className={styles.series_mark} />
      {listVisible && (
        <ol className={styles.list}>
          {dummySeriesDetail.postList.map(seriesPost => {
            return (
              <li key={seriesPost.series_id}>
                <Link
                  to={`/@${dummySeriesDetail.authorId}/${seriesPost.post.title}`}
                  style={
                    seriesPost.series_id === dummySeriesDetail.id
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
          >{`${dummySeriesDetail.id}/${dummySeriesDetail.postList.length}`}</div>
          <div className={styles.button_container}>
            <button type="button" disabled>
              <LeftIcon />
            </button>
            <button type="button">
              <RightIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
