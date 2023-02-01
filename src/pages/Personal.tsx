import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  username: 'myId',
  velog_name: 'my_velog',
  email: 'mail',
  name: '이름',
  profile_image: '',
  introduction: '내 벨로그',
  github: 'github',
  twitter: 'twitter',
  facebook: 'facebook',
  homepage: 'https://localhost:3000',
  mail: 'myId@snu.ac.kr',
  about: 'about 페이지에 들어갈 설명입니다',
};

const userTags: string[] = ['tagA', 'tagB', 'tagC'];

const postList: post[] = [
  {
    pid: 1,
    title: '포스트 제목입니다',
    author: 'id',
    url: 'post-title-1',
    preview: '포스트를 소개해주세요.',
    thumbnail: 'https://pbs.twimg.com/media/Ct9Zp2UVYAAcnEt.jpg',
    tags: [
      {
        name: 'html',
        postCount: 6,
      },
      {
        name: 'css',
        postCount: 6,
      },
    ],
    created_at: '2023-01-26 12:30:10',
    updated_at: '2023-01-26 12:30:10',
    comments: 23,
    likes: 45,
    is_private: false,
  },
  {
    pid: 2,
    title: '포스트 제목입니다',
    author: 'id',
    url: 'post-title-2',
    preview: '포스트를 소개해주세요.',
    thumbnail: 'https://pbs.twimg.com/media/Ct9Zp2UVYAAcnEt.jpg',
    tags: [
      {
        name: 'html',
        postCount: 6,
      },
      {
        name: 'css',
        postCount: 6,
      },
    ],
    created_at: '2023-01-23 12:30:10',
    updated_at: '2023-01-23 12:30:10',
    comments: 23,
    likes: 45,
    is_private: false,
  },
  {
    pid: 3,
    title: '포스트 제목입니다',
    author: 'id',
    url: 'post-title-3',
    preview: '포스트를 소개해주세요.',
    thumbnail: 'https://pbs.twimg.com/media/Ct9Zp2UVYAAcnEt.jpg',
    tags: [
      {
        name: 'html',
        postCount: 6,
      },
      {
        name: 'css',
        postCount: 6,
      },
    ],
    created_at: '2023-01-26 16:10:10',
    updated_at: '2023-01-26 16:10:10',
    comments: 23,
    likes: 45,
    is_private: false,
  },
  {
    pid: 4,
    title: '포스트 제목입니다',
    author: 'id',
    url: 'post-title-4',
    preview: '포스트를 소개해주세요.',
    thumbnail: 'https://pbs.twimg.com/media/Ct9Zp2UVYAAcnEt.jpg',
    tags: [
      {
        name: 'html',
        postCount: 6,
      },
      {
        name: 'css',
        postCount: 6,
      },
    ],
    created_at: '2023-01-26 12:30:10',
    updated_at: '2023-01-26 12:30:10',
    comments: 23,
    likes: 45,
    is_private: true,
  },
];

function Personal() {
  const [query, setQuery] = useState('');
  function getPostnum(tag: string) {
    return tag.length;
  }
  const tagQuery = new URLSearchParams(window.location.search).get('tag');

  return (
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
                  <Link to={`/@${currentUser.username}`}>전체보기</Link>
                  <span>({getPostnum('')})</span>
                </li>
                {userTags.map((tag: string) => (
                  <li
                    className={cx(
                      'tagElem',
                      tagQuery === tag ? 'tagActive' : 'none'
                    )}
                  >
                    <Link to={`/@${currentUser.username}?tag=${tag}`}>
                      {tag}
                    </Link>
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
          {postList.map((postComp: post) => (
            <BigPostComp
              key={postComp.pid}
              postInfo={postComp}
              username={currentUser.username}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Personal;
