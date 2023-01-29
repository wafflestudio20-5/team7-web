import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/extensions,import/no-unresolved
import classNames from 'classnames/bind';
// eslint-disable-next-line import/extensions,import/no-unresolved
import axios from 'axios';
import styles from './TagsTag.module.scss';
// eslint-disable-next-line import/extensions,import/no-unresolved
import Header from '../components/Header';
// eslint-disable-next-line import/extensions,import/no-unresolved
import ScrollBigPosts from '../components/ScrollBigPosts';
// eslint-disable-next-line import/extensions,import/no-unresolved
import { post, tag } from '../contexts/types';

const cx = classNames.bind(styles);

const currentTag: tag = {
  name: 'JavaScript',
  thumbnail: 'https://images.velog.io/tags/JavaScript.png',
  intro:
    'JavaScript(JS)는 가벼운 인터프리터 또는 JIT 컴파일 프로그래밍 언어로, 일급 함수를 지원합니다. 웹 페이지의 스크립트 언어로서 제일 유명하지만 Node.js, Apache CouchDB, Adobe Acrobat처럼 많은 비 브라우저 환경에서도 사용하고 있습니다. JavaScript는 프로토타입 기반의 동적 다중 패러다임 스크립트 언어로, 객체지향형, 명령형, 선언형(함수형 프로그래밍 등) 스타일을 지원합니다.',
  postCount: 50498,
};

function TagsTag() {
  const initialPost: post[] = [];
  const [tagPosts, setTagPosts] = useState(initialPost);

  async function setPosts() {
    try {
      const response = await axios.get('/api/v1/velog');
      setTagPosts(response.data);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    setPosts();
  }, []);

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
            <ScrollBigPosts posts={tagPosts} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default TagsTag;
