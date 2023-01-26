import React, { useState } from 'react';
// eslint-disable-next-line import/extensions,import/no-unresolved
import classNames from 'classnames/bind';
// eslint-disable-next-line import/extensions,import/no-unresolved
import styles from './Search.module.scss';
// eslint-disable-next-line import/extensions,import/no-unresolved
import Header from '../components/Header';
// eslint-disable-next-line import/extensions,import/no-unresolved
import BigPostComp from '../components/BigPostComp';
// eslint-disable-next-line import/extensions,import/no-unresolved
import { post, user } from '../contexts/types';

const cx = classNames.bind(styles);

function Search() {
  const [query, setQuery] = useState('');
  const username = new URLSearchParams(window.location.search).get('username');
  const exampleUser: user = {
    id: 'myId',
    velog_name: 'my_velog',
    email: 'mail',
    username: '이름',
    userImg: '',
    description: '내 벨로그',
    github: 'github',
    twitter: 'twitter',
    facebook: 'facebook',
    homepage: 'https://localhost:3000',
    mail: 'myId@snu.ac.kr',
  };
  const posts: post[] = [
    {
      id: 1,
      title: '포스트 제목입니다',
      author: exampleUser,
      url: 'post-title-1',
      preview: '포스트를 소개해주세요.',
      thumbnail: 'https://pbs.twimg.com/media/Ct9Zp2UVYAAcnEt.jpg',
      tags: ['tagA', 'tagB', 'tagC'],
      created_at: '2023-01-26 12:30:10',
      updated_at: '2023-01-26 12:30:10',
      comments: 23,
      likes: 45,
      is_private: false,
    },
    {
      id: 2,
      title: '포스트 제목입니다',
      author: exampleUser,
      url: 'post-title-2',
      preview: '포스트를 소개해주세요.',
      thumbnail: 'https://pbs.twimg.com/media/Ct9Zp2UVYAAcnEt.jpg',
      tags: ['tagA', 'tagB', 'tagC'],
      created_at: '2023-01-23 12:30:10',
      updated_at: '2023-01-23 12:30:10',
      comments: 23,
      likes: 45,
      is_private: false,
    },
    {
      id: 3,
      title: '포스트 제목입니다',
      author: exampleUser,
      url: 'post-title-3',
      preview: '포스트를 소개해주세요.',
      thumbnail: 'https://pbs.twimg.com/media/Ct9Zp2UVYAAcnEt.jpg',
      tags: ['tagA', 'tagB', 'tagC'],
      created_at: '2023-01-26 16:10:10',
      updated_at: '2023-01-26 16:10:10',
      comments: 23,
      likes: 45,
      is_private: false,
    },
    {
      id: 4,
      title: '포스트 제목입니다',
      author: exampleUser,
      url: 'post-title-4',
      preview: '포스트를 소개해주세요.',
      thumbnail: 'https://pbs.twimg.com/media/Ct9Zp2UVYAAcnEt.jpg',
      tags: ['tagA', 'tagB', 'tagC'],
      created_at: '2023-01-26 12:30:10',
      updated_at: '2023-01-26 12:30:10',
      comments: 23,
      likes: 45,
      is_private: true,
    },
  ];
  const postCount = posts.length;

  return (
    <div>
      <Header />
      <div className={cx('searchDiv')}>
        <div>
          {username !== null && (
            <div className={cx('author')}>
              {username}님이 작성한 포스트 검색
            </div>
          )}
          <div className={cx('queryInput')}>
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
        </div>
        {query !== '' && (
          // @ts-ignore
          <div className={cx('found')}>
            총 <b>{postCount}개</b>의 포스트를 찾았습니다.
          </div>
        )}
        {query !== '' && (
          <div>
            {posts.map((postComp: post) => (
              <BigPostComp
                key={postComp.id}
                postInfo={postComp}
                username={username === null ? '' : username}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
