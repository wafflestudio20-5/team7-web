import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line import/extensions,import/no-unresolved
import classNames from 'classnames/bind';
// eslint-disable-next-line import/extensions,import/no-unresolved
import Header from '../components/Header';
// eslint-disable-next-line import/extensions,import/no-unresolved
import UserIntro from '../components/UserIntro';
// eslint-disable-next-line import/extensions,import/no-unresolved
import styles from './PersonalAbout.module.scss';
// eslint-disable-next-line import/extensions,import/no-unresolved
import { useLoginValue } from '../contexts/LoginProvider';
// eslint-disable-next-line import/extensions,import/no-unresolved
import { user, userDetail } from '../contexts/types';

const cx = classNames.bind(styles);

const currentUser: user = {
  username: 'id',
  velog_name: 'myvelog.log',
  email: 'mail',
  name: '이름',
  profile_image: '',
  introduction: 'desc',
  github: 'github',
  twitter: 'twitter',
  facebook: 'facebook',
  homepage: 'https://localhost:3000',
  mail: 'yuye2002@snu.ac.kr',
  about: 'about',
};

function PersonalAbout() {
  const loginUser =
    useLoginValue().isLogin &&
    useLoginValue().user?.username === currentUser.username;
  const [isWriting, setWriting] = useState(false);
  function writeOpen() {
    setWriting(true);
  }
  const [newAbout, setAbout] = useState(currentUser.about);
  function writeClose() {
    currentUser.about = newAbout;
    setWriting(false);
  }

  return (
    <div>
      {!isWriting && currentUser.about === '' && (
        <div className={cx('empty')}>
          <img
            src="https://static.velog.io/static/media/undraw_empty.5fd6f2b8.svg"
            alt="empty about"
          />
          <div className={cx('message')}>소개가 작성되지 않았습니다.</div>
          {loginUser && (
            <button
              type="button"
              color="teal"
              className={cx('addIntro')}
              onClick={writeOpen}
            >
              소개 글 작성하기
            </button>
          )}
        </div>
      )}
      {!isWriting && currentUser.about !== '' && (
        <div>
          {loginUser && (
            <div className={cx('buttonDiv')}>
              <button
                type="button"
                color="teal"
                className={cx('button')}
                onClick={writeOpen}
              >
                수정하기
              </button>
            </div>
          )}
          <div className={cx('intro')}>{newAbout}</div>
        </div>
      )}
      {isWriting && (
        <div>
          <div className={cx('buttonDiv')}>
            <button
              type="button"
              color="teal"
              className={cx('button')}
              onClick={writeClose}
            >
              저장하기
            </button>
          </div>
          <textarea
            defaultValue={currentUser.about}
            placeholder="소개 문구를 입력하세요."
            onChange={e => setAbout(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}

export default PersonalAbout;
