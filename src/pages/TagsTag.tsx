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
            <h1># {currentTag.name}</h1>
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
