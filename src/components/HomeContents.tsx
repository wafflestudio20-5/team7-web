import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './HomeContents.module.scss';
import HeaderFilter from './HeaderFilter';

const cx = classNames.bind(styles);

function Post() {
  return (
    <div className={cx('post')}>
      <a className={cx('image-link')} href="/">
        <div className={cx('image-container')}>
          <img
            src="https://th.bing.com/th/id/R.d01dd3fd4074d38334656a25a511dd5a?rik=x6upOuofKEAgRQ&riu=http%3a%2f%2fwww.etoland.co.kr%2fdata%2fdaumeditor02%2f200202%2f56492515806018600.jpg&ehk=e7vLw%2bHjTj3q2eX6TnrulH77vFS5G4qzokeLISh%2brRM%3d&risl=&pid=ImgRaw&r=0"
            alt="post"
          />
        </div>
      </a>
      <div className={cx('body')}>
        <a className={cx('content')} href="/">
          <h4>포스트 제목</h4>
          <div>
            <p>포스트 소개 글</p>
          </div>
        </a>
        <div className={cx('sub-info')}>
          <span>2022년 12월 30일</span>
          <span> · </span>
          <span>14개의 댓글</span>
        </div>
      </div>
      <div className={cx('footer')}>
        <a href="/">
          <img
            className={cx('profile')}
            src="https://velog.velcdn.com/images/silky225/profile/f3d11391-6a64-4cf0-9889-46778956d77e/social_profile.png"
            alt="profile"
          />
          by
          <span>writer</span>
        </a>
        <div className={cx('likes')}>♥ 77</div>
      </div>
    </div>
  );
}

export default function HomeContents() {
  return (
    <div className={cx('contents')}>
      <HeaderFilter />
      <div className={cx('container')}>
        <main>
          <div className={cx('posts')}>
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
          </div>
        </main>
      </div>
    </div>
  );
}
