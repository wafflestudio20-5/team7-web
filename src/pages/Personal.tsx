import React, { useState } from 'react';
// eslint-disable-next-line import/extensions,import/no-unresolved
import classNames from 'classnames/bind';
// eslint-disable-next-line import/extensions,import/no-unresolved
import Header from '../components/Header';
// eslint-disable-next-line import/extensions,import/no-unresolved
import UserIntro from '../components/UserIntro';
// eslint-disable-next-line import/extensions,import/no-unresolved
import BigPostComp from '../components/BigPostComp';
// eslint-disable-next-line import/extensions,import/no-unresolved
import styles from './Personal.module.scss';

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
      public: true,
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
      public: true,
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
      public: true,
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
      public: false,
    },
  ],
  series: [],
  about: '<h1>벨로그에 오신 것을 환영합니다.</h1>',
};

interface post {
  id: number;
  title: string;
  url: string;
  intro: string;
  thumbnail: string;
  seriesTitle: string;
  seriesId: number;
  tags: string[];
  date: string;
  comments: number;
  authorId: string;
  authorImg: string;
  heart: number;
  public: boolean;
}

function Personal() {
  const [query, setQuery] = useState('');
  function getPostnum(tag: string) {
    return tag.length;
  }
  const tagQuery = new URLSearchParams(window.location.search).get('tag');

  return (
    <div className={cx('page')}>
      <Header />
      <div className={cx('pageContent')}>
        <UserIntro userInfo={user} />
        <div>
          <div className={cx('pageIndex')}>
            <a href={`/@${user.username}`} className={cx('index', 'active')}>
              글
            </a>
            <a href={`/@${user.username}/series`} className={cx('index')}>
              시리즈
            </a>
            <a href={`/@${user.username}/about`} className={cx('index')}>
              소개
            </a>
            <div className={cx('activeLine')} />
          </div>
        </div>
        <div>
          <div>
            <section className={cx('searchSection')}>
              <div className={cx('box')}>
                <svg width="17" height="17" viewBox="0 0 17 17">
                  <path
                    fillRule="evenodd"
                    d="M13.66 7.36a6.3 6.3 0 1 1-12.598 0 6.3 6.3 0 0 1 12.598 0zm-1.73 5.772a7.36 7.36 0 1 1 1.201-1.201l3.636 3.635c.31.31.31.815 0 1.126l-.075.075a.796.796 0 0 1-1.126 0l-3.636-3.635z"
                    clipRule="evenodd"
                    fill="currentColor"
                  />
                </svg>
                <input
                  placeholder="검색어를 입력하세요"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                />
              </div>
            </section>
          </div>
          <div className={cx('tagDiv')}>
            <div>
              <div className={cx('tagList')}>
                <div>
                  <div className={cx('title')}>태그 목록</div>
                  <ul>
                    <li
                      className={cx(
                        'tagElem',
                        tagQuery === null ? 'tagActive' : 'none'
                      )}
                    >
                      <a href={`/@${user.username}`}>전체보기</a>
                      <span>({getPostnum('')})</span>
                    </li>
                    {user.tags.map((tag: string) => (
                      <li
                        className={cx(
                          'tagElem',
                          tagQuery === tag ? 'tagActive' : 'none'
                        )}
                      >
                        <a href={`/@${user.username}?tag=${tag}`}>{tag}</a>
                        <span>({getPostnum(tag)})</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="postList">
              {user.posts.map((postComp: post) => (
                <BigPostComp
                  key={postComp.id}
                  postInfo={postComp}
                  username={user.username}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Personal;
