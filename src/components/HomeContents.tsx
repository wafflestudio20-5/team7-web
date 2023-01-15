import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './HomeContents.module.scss';
import HeaderFilter from './HeaderFilter';
import PostComp from './PostComp';

const cx = classNames.bind(styles);

export default function HomeContents() {
  return (
    <div className={cx('contents')}>
      <HeaderFilter />
      <div className={cx('container')}>
        <main>
          <div className={cx('posts')}>
            <PostComp />
            <PostComp />
            <PostComp />
            <PostComp />
            <PostComp />
            <PostComp />
            <PostComp />
            <PostComp />
            <PostComp />
            <PostComp />
          </div>
        </main>
      </div>
    </div>
  );
}
