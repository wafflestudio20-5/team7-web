import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
// eslint-disable-next-line import/extensions,import/no-unresolved
import classNames from 'classnames/bind';
// eslint-disable-next-line import/extensions,import/no-unresolved
import axios from 'axios';
import Header from '../components/Header';
// eslint-disable-next-line import/extensions,import/no-unresolved
import UserIntro from '../components/UserIntro';
// eslint-disable-next-line import/extensions,import/no-unresolved
import styles from './PersonalAbout.module.scss';
// eslint-disable-next-line import/extensions,import/no-unresolved
import { useLoginValue } from '../contexts/LoginProvider';

const cx = classNames.bind(styles);

function PersonalAbout() {
  const { id } = useParams();
  const [currentUser, setUser] = useState({
    username: 'id',
    velog_name: 'id.log',
    email: 'mail',
    name: 'name',
    profile_image: 'img',
    introduction: 'intro',
    github: 'github',
    twitter: 'twitter',
    facebook: 'facebook',
    homepage: 'homepage',
    mail: 'email',
    about: 'desc',
  });
  const [newAbout, setAbout] = useState(currentUser.about);

  const getUser = useCallback(async () => {
    try {
      const response = await axios.get(`/api/v1/accounts/user/${id}`);
      setUser(response.data);
      setAbout(currentUser.about);
    } catch (e) {
      console.error(e);
    }
  }, [id]);

  useEffect(() => {
    getUser();
  }, [id]);

  const loginUser =
    useLoginValue().isLogin &&
    useLoginValue().user?.username === currentUser.username;
  const [isWriting, setWriting] = useState(false);
  function writeOpen() {
    setWriting(true);
  }
  async function writeClose() {
    try {
      setWriting(false);
      await axios.patch('/api/v1/accounts/user/', {
        ...currentUser,
        about: newAbout,
      });
      getUser();
    } catch (e) {
      console.error(e);
    }
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
          <div className={cx('intro')}>{currentUser.about}</div>
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
