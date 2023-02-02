import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/extensions,import/no-unresolved
import classNames from 'classnames/bind';
// eslint-disable-next-line import/extensions,import/no-unresolved
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './TagsTag.module.scss';
// eslint-disable-next-line import/extensions,import/no-unresolved
import Header from '../components/Header';
// eslint-disable-next-line import/extensions,import/no-unresolved
import ScrollBigPosts from '../components/ScrollBigPosts';
// eslint-disable-next-line import/extensions,import/no-unresolved
import { post } from '../contexts/types';

const cx = classNames.bind(styles);

function TagsTag() {
  const { tag } = useParams();

  const [tagPosts, setTagPosts] = useState([]);
  const [postCount, setCount] = useState(0);

  async function setPosts() {
    try {
      const response = await axios.get(`/api/v1/velog/tags/${tag}`);
      setTagPosts(response.data);
      setCount(response.data.length);
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
            <h1># {tag}</h1>
            <div className={cx('count')}>총 {postCount}개의 포스트</div>
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
