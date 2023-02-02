import React, { useCallback, useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
// eslint-disable-next-line import/extensions,import/no-unresolved
import classNames from 'classnames/bind';
// eslint-disable-next-line import/extensions,import/no-unresolved
import axios from 'axios';
import Header from '../components/Header';
import HeaderMoving from '../components/HeaderMoving';
// eslint-disable-next-line import/extensions,import/no-unresolved
import UserIntro from '../components/UserIntro';
// eslint-disable-next-line import/extensions,import/no-unresolved
import styles from './PersonalLayout.module.scss';

const cx = classNames.bind(styles);

function PersonalLayout() {
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

  const getUser = useCallback(async () => {
    try {
      const response = await axios.get(`/api/v1/accounts/user/${id}`);
      setUser(response.data);
    } catch (e) {
      console.error(e);
    }
  }, [id]);

  useEffect(() => {
    getUser();
  }, [id]);

  const path = useLocation().pathname;

  const [underlinePos, setUnderlinePos] = useState(0);
  const [underlineDest, setUnderlineDest] = useState(0);

  useEffect(() => {
    if (path === `/@${currentUser.username}`) setUnderlineDest(0);
    else if (path === `/@${currentUser.username}/series`) setUnderlineDest(128);
    else if (path === `/@${currentUser.username}/about`) setUnderlineDest(256);
  }, [path]);

  useEffect(() => {
    const initialDist = underlineDest - underlinePos;
    setUnderlinePos(underlinePos + initialDist);
  }, [underlineDest]);

  return (
    <div className={cx('page')}>
      <Header />
      <HeaderMoving />
      <div className={cx('pageContent')}>
        <UserIntro userInfo={currentUser} />
        <div>
          <div className={cx('pageIndex')}>
            <Link
              to={`/@${currentUser.username}`}
              className={cx('index', {
                active: path === `/@${currentUser.username}`,
              })}
            >
              글
            </Link>
            <Link
              to={`/@${currentUser.username}/series`}
              className={cx('index', {
                active: path === `/@${currentUser.username}/series`,
              })}
            >
              시리즈
            </Link>
            <Link
              to={`/@${currentUser.username}/about`}
              className={cx('index', {
                active: path === `/@${currentUser.username}/about`,
              })}
            >
              소개
            </Link>
            <div
              className={cx('underline')}
              style={{
                transform: `translate(${underlinePos}px)`,
                transition: `transform 0.25s ease-out 0s`,
              }}
            />
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default PersonalLayout;
