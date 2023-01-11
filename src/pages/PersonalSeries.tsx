import React from 'react';
// eslint-disable-next-line import/extensions,import/no-unresolved
import classNames from 'classnames/bind';
// eslint-disable-next-line import/extensions,import/no-unresolved
import Header from '../components/Header';
// eslint-disable-next-line import/extensions,import/no-unresolved
import UserIntro from '../components/UserIntro';
// eslint-disable-next-line import/extensions,import/no-unresolved
import styles from './PersonalSeries.module.scss';

const cx = classNames.bind(styles);

const user = {
  username: '2-0-is',
  userImg: '',
  description: '이영은의 벨로그',
  github: '2-0-is',
  twitter: 'twitter',
  facebook: 'facebook',
  homepage: 'https://localhost:3000',
  mail: 'yuye2002@snu.ac.kr',
  tags: ['새태그'],
  posts: [
    {
      id: 1,
      title: '포스트 제목입니다',
      url: 'post-title-1',
      intro: '포스트를 소개해주세요.',
      thumbnail: 'https://pbs.twimg.com/media/Ct9Zp2UVYAAcnEt.jpg',
      seriesTitle: 'series1',
      seriesId: 1,
      tags: ['tagA', 'tagB', 'tagC'],
      date: '2022년 10월 31일',
      comments: 10,
      authorId: '2-0-is',
      authorImg: '',
      heart: 10,
    },
    {
      id: 2,
      title: '포스트 제목입니다',
      url: 'post-title-2',
      intro: '포스트를 소개해주세요.',
      thumbnail: 'https://pbs.twimg.com/media/Ct9Zp2UVYAAcnEt.jpg',
      seriesTitle: 'series1',
      seriesId: 2,
      tags: ['tagA', 'tagB', 'tagC'],
      date: '2022년 10월 31일',
      comments: 10,
      authorId: '2-0-is',
      authorImg: '',
      heart: 10,
    },
    {
      id: 3,
      title: '포스트 제목입니다',
      url: 'post-title-3',
      intro: '포스트를 소개해주세요.',
      thumbnail: 'https://pbs.twimg.com/media/Ct9Zp2UVYAAcnEt.jpg',
      seriesTitle: 'series1',
      seriesId: 3,
      tags: ['tagA', 'tagB', 'tagC'],
      date: '2022년 10월 31일',
      comments: 10,
      authorId: '2-0-is',
      authorImg: '',
      heart: 10,
    },
    {
      id: 4,
      title: '포스트 제목입니다',
      url: 'post-title-4',
      intro: '포스트를 소개해주세요.',
      thumbnail: 'https://pbs.twimg.com/media/Ct9Zp2UVYAAcnEt.jpg',
      seriesTitle: '',
      seriesId: 0,
      tags: [],
      date: '2022년 10월 31일',
      comments: 10,
      authorId: '2-0-is',
      authorImg: '',
      heart: 10,
    },
  ],
  series: [],
  about: '<h1>벨로그에 오신 것을 환영합니다.</h1>',
};
interface series {
  id: number;
  title: string;
  photo: string;
  update: string;
  authorId: string;
  postNum: number;
}

function PersonalSeries() {
  return (
    <div className={cx('page')}>
      <Header />
      <div className={cx('pageContent')}>
        <UserIntro userInfo={user} />
        <div>
          <div className={cx('pageIndex')}>
            <a href={`/@${user.username}`} className={cx('index')}>
              글
            </a>
            <a
              href={`/@${user.username}/series`}
              className={cx('index', 'active')}
            >
              시리즈
            </a>
            <a href={`/@${user.username}/about`} className={cx('index')}>
              소개
            </a>
            <div className={cx('activeLine')} />
          </div>
        </div>
        <div>
          <div className="seriesList">
            {user.series.map((seriesInfo: series) => (
              <div className="seriesDiv">
                <a href={`/@${seriesInfo.authorId}/series/${seriesInfo.title}`}>
                  <div>
                    <img src={seriesInfo.photo} alt="thumbnail" />
                  </div>
                </a>
                <h4>
                  <a
                    href={`/@${seriesInfo.authorId}/series/${seriesInfo.title}`}
                  >
                    {seriesInfo.title}
                  </a>
                </h4>
                <div className="subInfo">
                  <span>{seriesInfo.postNum}개의 포스트 · </span>
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
