import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
// eslint-disable-next-line import/extensions,import/no-unresolved
import classNames from 'classnames/bind';
// eslint-disable-next-line import/extensions,import/no-unresolved
import Header from '../components/Header';
import HeaderMoving from '../components/HeaderMoving';
// eslint-disable-next-line import/extensions,import/no-unresolved
import UserIntro from '../components/UserIntro';
// eslint-disable-next-line import/extensions,import/no-unresolved
import styles from './PersonalLayout.module.scss';
// eslint-disable-next-line import/extensions,import/no-unresolved,camelcase
import { user } from '../contexts/types';

const cx = classNames.bind(styles);
const currentUser: user = {
  id: 'myId',
  velog_name: 'my_velog',
  email: 'mail',
  username: '이름',
  userImg: '',
  description: '내 벨로그',
  github: 'github',
  twitter: 'twitter',
  facebook: 'facebook',
  homepage: 'https://localhost:3000',
  mail: 'myId@snu.ac.kr',
};

function PersonalLayout() {
  const path = useLocation().pathname;
  const [underlinePos, setUnderlinePos] = useState(0);
  const [underlineDest, setUnderlineDest] = useState(0);

  useEffect(() => {
    if (path === `/@${currentUser.id}`) setUnderlineDest(0);
    else if (path === `/@${currentUser.id}/series`) setUnderlineDest(128);
    else if (path === `/@${currentUser.id}/about`) setUnderlineDest(256);
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
              to={`/@${currentUser.id}`}
              className={cx('index', {
                active: path === `/@${currentUser.id}`,
              })}
            >
              글
            </Link>
            <Link
              to={`/@${currentUser.id}/series`}
              className={cx('index', {
                active: path === `/@${currentUser.id}/series`,
              })}
            >
              시리즈
            </Link>
            <Link
              to={`/@${currentUser.id}/about`}
              className={cx('index', {
                active: path === `/@${currentUser.id}/about`,
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
