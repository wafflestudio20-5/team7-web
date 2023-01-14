import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import search from '../resources/search.png';
import { useLoginValue, useLoginSetting } from '../contexts/LoginProvider';

const cx = classNames.bind(styles);

export default function Header() {
  const [menuOn, setMenuOn] = useState(false);

  const { isLogin } = useLoginValue();
  const { logout } = useLoginSetting();

  const [modalOn, setModalOn] = useState(false);

  const path = useLocation().pathname;

  function openMenu() {
    if (menuOn === false) {
      setMenuOn(true);
    } else {
      setMenuOn(false);
    }
  }

  function changeModal() {
    if (modalOn === false) {
      setModalOn(true);
    } else {
      setModalOn(false);
    }
  }

  return (
    <div>
      <div className={cx('header')}>
        <div className={cx('center')}>
          <div className={path === '/myvelog' ? cx('blind') : cx('left')}>
            <a href="/">velog</a>
          </div>
          <div className={path === '/myvelog' ? cx('left') : cx('blind')}>
            <a href="/">
              <img
                src="https://th.bing.com/th/id/R.96f8c2f286f01b640e87b113e630b540?rik=615zqZQiGS8hLQ&riu=http%3a%2f%2fwww.zumalakarregimuseoa.eus%2feu%2f06vimeo.png&ehk=KRybvv%2fa1k3ANJCrkUGMFflBCp4fD6JZTDUTlkXvbRk%3d&risl=&pid=ImgRaw&r=0"
                alt="velog"
              />
            </a>
            <a href={'/'.concat('')}>id.log</a>
          </div>
          <div className={cx('right')}>
            <a href="/search" className={cx('search')}>
              <svg width="17" height="17" viewBox="0 0 17 17">
                <path
                  fillRule="evenodd"
                  d="M13.66 7.36a6.3 6.3 0 1 1-12.598 0 6.3 6.3 0 0 1 12.598 0zm-1.73 5.772a7.36 7.36 0 1 1 1.201-1.201l3.636 3.635c.31.31.31.815 0 1.126l-.075.075a.796.796 0 0 1-1.126 0l-3.636-3.635z"
                  clipRule="evenodd"
                  fill="currentColor"
                />
              </svg>
            </a>
            <a href="/write">
              <button
                type="button"
                className={isLogin ? cx('write-button') : cx('blind')}
              >
                새 글 작성
              </button>
            </a>
            <button
              type="button"
              className={isLogin ? cx('blind') : cx('login-button')}
            >
              로그인
            </button>
            <div>
              <div
                className={isLogin ? cx('user') : cx('blind')}
                onClick={openMenu}
                role="presentation"
              >
                <img
                  className={cx('profile')}
                  src="https://velog.velcdn.com/images/silky225/profile/f3d11391-6a64-4cf0-9889-46778956d77e/social_profile.png"
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
            <div className={cx('menu-wrapper')}>
              <a href="/myvelog">
                <div>내 벨로그</div>
              </a>
              <a href="/saves">
                <div>임시 글</div>
              </a>
              <a href="/lists/liked">
                <div>읽기 목록</div>
              </a>
              <a href="/follows">
                <div>팔로우 관리</div>
              </a>
              <a href="/setting">
                <div>설정</div>
              </a>
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
