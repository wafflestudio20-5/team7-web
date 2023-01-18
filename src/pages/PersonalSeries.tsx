import React from 'react';
// eslint-disable-next-line import/extensions,import/no-unresolved
import classNames from 'classnames/bind';
// eslint-disable-next-line import/extensions,import/no-unresolved
import Header from '../components/Header';
// eslint-disable-next-line import/extensions,import/no-unresolved
import UserIntro from '../components/UserIntro';
// eslint-disable-next-line import/extensions,import/no-unresolved
import styles from './PersonalSeries.module.scss';
// eslint-disable-next-line import/extensions,import/no-unresolved
import { series, user, userDetail } from '../contexts/types';

const cx = classNames.bind(styles);

const currentUser: user = {
  id: '2-0-is',
  velog_name: '2-0-is_velog',
  email: 'mail',
  username: '이영은',
  userImg: '',
  description: '이영은의 벨로그',
  github: '2-0-is',
  twitter: 'twitter',
  facebook: 'facebook',
  homepage: 'https://localhost:3000',
  mail: 'yuye2002@snu.ac.kr',
};

const detailedUser: userDetail = {
  id: '2-0-is',
  velog_name: '2-0-is_velog',
  email: 'mail',
  username: '이영은',
  userImg: '',
  description: '이영은의 벨로그',
  github: '2-0-is',
  twitter: 'twitter',
  facebook: 'facebook',
  homepage: 'https://localhost:3000',
  mail: 'yuye2002@snu.ac.kr',
  tags: ['tagA', 'tagB', 'tagC'],
  posts: [
    {
      id: 1,
      title: '포스트 제목입니다',
      author: currentUser,
      url: 'post-title-1',
      preview: '포스트를 소개해주세요.',
      thumbnail: 'https://pbs.twimg.com/media/Ct9Zp2UVYAAcnEt.jpg',
      tags: ['tagA', 'tagB', 'tagC'],
      created_at: '2022-12-30',
      updated_at: '2022-12-31',
      comments: 23,
      likes: 45,
      is_private: false,
    },
    {
      id: 2,
      title: '포스트 제목입니다',
      author: currentUser,
      url: 'post-title-2',
      preview: '포스트를 소개해주세요.',
      thumbnail: 'https://pbs.twimg.com/media/Ct9Zp2UVYAAcnEt.jpg',
      tags: ['tagA', 'tagB', 'tagC'],
      created_at: '2022-12-30',
      updated_at: '2022-12-31',
      comments: 23,
      likes: 45,
      is_private: false,
    },
    {
      id: 3,
      title: '포스트 제목입니다',
      author: currentUser,
      url: 'post-title-3',
      preview: '포스트를 소개해주세요.',
      thumbnail: 'https://pbs.twimg.com/media/Ct9Zp2UVYAAcnEt.jpg',
      tags: ['tagA', 'tagB', 'tagC'],
      created_at: '2022-12-30',
      updated_at: '2022-12-31',
      comments: 23,
      likes: 45,
      is_private: false,
    },
    {
      id: 4,
      title: '포스트 제목입니다',
      author: currentUser,
      url: 'post-title-4',
      preview: '포스트를 소개해주세요.',
      thumbnail: 'https://pbs.twimg.com/media/Ct9Zp2UVYAAcnEt.jpg',
      tags: ['tagA', 'tagB', 'tagC'],
      created_at: '2022-12-30',
      updated_at: '2022-12-31',
      comments: 23,
      likes: 45,
      is_private: true,
    },
  ],
  series: [
    {
      id: 1,
      title: '내 시리즈',
      url: 'my-seires',
      photo: 'https://pbs.twimg.com/media/Ct9Zp2UVYAAcnEt.jpg',
      update: '2022-01-01',
      authorId: '2-0-is',
      postNum: 12,
    },
  ],
  about: '<h1>내 벨로그입니다.</h1>',
};

function PersonalSeries() {
  return (
    <div className={cx('page')}>
      <Header />
      <div className={cx('pageContent')}>
        <UserIntro userInfo={currentUser} />
        <div>
          <div className={cx('pageIndex')}>
            <a href={`/@${currentUser.id}`} className={cx('index')}>
              글
            </a>
            <a
              href={`/@${currentUser.id}/series`}
              className={cx('index', 'active')}
            >
              시리즈
            </a>
            <a href={`/@${currentUser.id}/about`} className={cx('index')}>
              소개
            </a>
            <div className={cx('activeLine')} />
          </div>
        </div>
        <div>
          <div className={cx('seriesList')}>
            {detailedUser.series.map((seriesInfo: series) => (
              <div className={cx('seriesDiv')}>
                <a
                  href={`/@${seriesInfo.authorId}/series/${seriesInfo.title}`}
                  className={cx('link')}
                >
                  <div>
                    <img src={seriesInfo.photo} alt="thumbnail" />
                  </div>
                </a>
                <h4>
                  <a
                    href={`/@${seriesInfo.authorId}/series/${seriesInfo.title}`}
                    className={cx('link')}
                  >
                    {seriesInfo.title}
                  </a>
                </h4>
                <div className={cx('subInfo')}>
                  <span className={cx('count')}>
                    {seriesInfo.postNum}개의 포스트
                  </span>
                  <span className={cx('dot')}>·</span>
                  마지막 업테이트 {seriesInfo.update}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalSeries;
