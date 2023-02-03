import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { useLoginValue, useLoginSetting } from '../contexts/LoginProvider';

const cx = classNames.bind(styles);

export default function Header() {
  const [menuOn, setMenuOn] = useState(false);

  const { isLogin, user } = useLoginValue();
  const { logout } = useLoginSetting();

  const path = useLocation().pathname;

  function openMenu() {
    if (menuOn === false) {
      setMenuOn(true);
    } else {
      setMenuOn(false);
    }
  }

  return (
    <div>
      <div
        className={cx('header')}
        style={{
          background: path[1] === '@' ? 'var(--bg-page2)' : 'var(--bg-page1)',
        }}
      >
        <div className={cx('center')}>
          <div className={path[1] === '@' ? cx('blind') : cx('left')}>
            <Link to="/">velog</Link>
          </div>
          <div className={path[1] === '@' ? cx('left') : cx('blind')}>
            <Link to="/">
              <img
                src="https://th.bing.com/th/id/R.96f8c2f286f01b640e87b113e630b540?rik=615zqZQiGS8hLQ&riu=http%3a%2f%2fwww.zumalakarregimuseoa.eus%2feu%2f06vimeo.png&ehk=KRybvv%2fa1k3ANJCrkUGMFflBCp4fD6JZTDUTlkXvbRk%3d&risl=&pid=ImgRaw&r=0"
                alt="velog"
              />
            </Link>
            <Link to={`/${path.split('/')[1]}`}>
              {path.split('/')[1].slice(1)}.log
            </Link>
          </div>
          <div className={cx('right')}>
            <Link to="/search" className={cx('search')}>
              <svg width="17" height="17" viewBox="0 0 17 17">
                <path
                  fillRule="evenodd"
                  d="M13.66 7.36a6.3 6.3 0 1 1-12.598 0 6.3 6.3 0 0 1 12.598 0zm-1.73 5.772a7.36 7.36 0 1 1 1.201-1.201l3.636 3.635c.31.31.31.815 0 1.126l-.075.075a.796.796 0 0 1-1.126 0l-3.636-3.635z"
                  clipRule="evenodd"
                  fill="currentColor"
                />
              </svg>
            </Link>
            <Link to="/write">
              <button
                type="button"
                className={isLogin ? cx('write-button') : cx('blind')}
              >
                새 글 작성
              </button>
            </Link>
            <Link to="/login">
              <button
                type="button"
                className={isLogin ? cx('blind') : cx('login-button')}
              >
                로그인
              </button>
            </Link>
            <div>
              <div
                className={isLogin ? cx('user') : cx('blind')}
                onClick={openMenu}
                role="presentation"
              >
                <img
                  className={cx('profile')}
                  src={
                    user
                      ? user.profile_image
                      : 'https://velog.velcdn.com/images/silky225/profile/f3d11391-6a64-4cf0-9889-46778956d77e/social_profile.png'
                  }
                  alt="profile"
                />
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 10l5 5 5-5z" />
                </svg>
              </div>
            </div>
          </div>
          <div className={menuOn ? cx('menu') : cx('blind')}>
            <div
              className={cx('menu-wrapper')}
              onClick={() => {
                setMenuOn(false);
              }}
              role="presentation"
            >
              <Link to={`/@${user ? user.username : ''}`}>
                <div>내 벨로그</div>
              </Link>
              <Link to="/lists/liked">
                <div>읽기 목록</div>
              </Link>
              <Link to="/setting">
                <div>설정</div>
              </Link>
              <div
                onClick={() => {
                  logout();
                  setMenuOn(false);
                }}
                role="presentation"
              >
                로그아웃
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
