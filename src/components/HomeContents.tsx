import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './HomeContents.module.scss';
import HeaderFilter from './HeaderFilter';
import PostComp from './PostComp';
import { post } from '../contexts/types';

const cx = classNames.bind(styles);

type HomeContentsProps = { posts: post[] };

export default function HomeContents({ posts }: HomeContentsProps) {
  return (
    <div className={cx('contents')}>
      <div className={cx('container')}>
        <main>
          <div className={cx('posts')}>
            {posts.map(post => (
              <PostComp post={post} key={post.pid} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
