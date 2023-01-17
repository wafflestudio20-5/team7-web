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
// eslint-disable-next-line import/extensions,import/no-unresolved,camelcase
import { post, user, userDetail } from '../contexts/types';

const cx = classNames.bind(styles);
const currentUser: user = {
  id: '2-0-is',
  velog_name: '2-0-is_velog',
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
      url: 'url',
      photo: 'https://pbs.twimg.com/media/Ct9Zp2UVYAAcnEt.jpg',
      update: '2022-12-21',
      authorId: '2-0-is',
      postNum: 12,
    },
  ],
  about: '<h1>내 벨로그입니다.</h1>',
};

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
        <UserIntro userInfo={currentUser} />
        <div>
          <div className={cx('pageIndex')}>
            <a href={`/@${currentUser.id}`} className={cx('index', 'active')}>
              글
            </a>
            <a href={`/@${currentUser.id}/series`} className={cx('index')}>
              시리즈
            </a>
            <a href={`/@${currentUser.id}/about`} className={cx('index')}>
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
                      <a href={`/@${currentUser.id}`}>전체보기</a>
                      <span>({getPostnum('')})</span>
                    </li>
                    {detailedUser.tags.map((tag: string) => (
                      <li
                        className={cx(
                          'tagElem',
                          tagQuery === tag ? 'tagActive' : 'none'
                        )}
                      >
                        <a href={`/@${currentUser.id}?tag=${tag}`}>{tag}</a>
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
              {detailedUser.posts.map((postComp: post) => (
                <BigPostComp
                  key={postComp.id}
                  postInfo={postComp}
                  username={currentUser.id}
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
