import React from 'react';
// eslint-disable-next-line import/extensions,import/no-unresolved
import classNames from 'classnames/bind';
// eslint-disable-next-line import/extensions,import/no-unresolved
import styles from './TagsTag.module.scss';
// eslint-disable-next-line import/extensions,import/no-unresolved
import Header from '../components/Header';
// eslint-disable-next-line import/extensions,import/no-unresolved
import BigPostComp from '../components/BigPostComp';
// eslint-disable-next-line import/extensions,import/no-unresolved
import { post, tag, user } from '../contexts/types';

const cx = classNames.bind(styles);

const currentTag: tag = {
  name: 'JavaScript',
  thumbnail: 'https://images.velog.io/tags/JavaScript.png',
  intro:
    'JavaScript(JS)는 가벼운 인터프리터 또는 JIT 컴파일 프로그래밍 언어로, 일급 함수를 지원합니다. 웹 페이지의 스크립트 언어로서 제일 유명하지만 Node.js, Apache CouchDB, Adobe Acrobat처럼 많은 비 브라우저 환경에서도 사용하고 있습니다. JavaScript는 프로토타입 기반의 동적 다중 패러다임 스크립트 언어로, 객체지향형, 명령형, 선언형(함수형 프로그래밍 등) 스타일을 지원합니다.',
  postCount: 50498,
};
const exampleUser: user = {
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
const tagPosts: post[] = [
  {
    id: 1,
    title: '포스트 제목입니다',
    author: exampleUser,
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
    author: exampleUser,
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
    author: exampleUser,
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
    author: exampleUser,
    url: 'post-title-4',
    preview: '포스트를 소개해주세요.',
    thumbnail: 'https://pbs.twimg.com/media/Ct9Zp2UVYAAcnEt.jpg',
    tags: ['tagA'],
    created_at: '2022-12-30',
    updated_at: '2022-12-31',
    comments: 23,
    likes: 45,
    is_private: true,
  },
];

function TagsTag() {
  return (
    <div className={cx('page')}>
      <Header />
      <main>
        <div className={cx('body')}>
          <div className={cx('tagInfo')}>
            <img src={currentTag.thumbnail} alt={currentTag.thumbnail} />
            <h1># {currentTag.name}</h1>
            <p>{currentTag.intro}</p>
            <div className={cx('count')}>
              총 {currentTag.postCount}개의 포스트
            </div>
          </div>
          <div>
            {tagPosts.map((postInfo: post) => (
              <BigPostComp key={postInfo.id} postInfo={postInfo} username="" />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default TagsTag;
