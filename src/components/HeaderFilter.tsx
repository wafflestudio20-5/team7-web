import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './HeaderFilter.module.scss';

const cx = classNames.bind(styles);

export default function HeaderFilter() {
  const path = useLocation().pathname;

  const [filterOn, setFilterOn] = useState(false);
  const [filterValue, setFilterValue] = useState('오늘');

  function openFilter() {
    if (filterOn === false) {
      setFilterOn(true);
    } else {
      setFilterOn(false);
    }
  }

  function changeFilter(e: any) {
    setFilterValue(e.target.innerHTML);
    setFilterOn(false);
  }

  console.log(path.split('/')[1]);

  return (
    <div
      className={
        path === '/' || path === '/recent' || path.split('/')[1] === 'lists'
          ? cx('middle')
          : cx('blind')
      }
    >
      <div className={cx('left')}>
        <div
          className={
            path === '/' || path === '/recent' ? cx('devider') : cx('blind')
          }
        >
          <a href="/" className={path === '/' ? cx('highlight') : ''}>
            <img
              src="https://miro.medium.com/fit/c/160/160/1*sNBbZwrZ0NRswY2lwWZ3Lw.png"
              alt="trend"
            />
            트렌딩
          </a>
          <a href="/recent" className={path === '/' ? '' : cx('highlight')}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3917/3917267.png"
              alt="recent"
            />
            최신
          </a>
        </div>
        <div
          className={
            path === '/' || path === '/recent' ? cx('blind') : cx('devider')
          }
        >
          <a
            href="/lists/liked"
            className={
              path === '/lists/liked' ? cx('highlight', 'wider') : cx('wider')
            }
          >
            좋아한 포스트
          </a>
          <a
            href="/lists/read"
            className={
              path === '/lists/read' ? cx('highlight', 'wider') : cx('wider')
            }
          >
            최근 읽은 포스트
          </a>
          <a
            href="/lists/following"
            className={
              path === '/lists/following'
                ? cx('highlight', 'wider')
                : cx('wider')
            }
          >
            구독한 포스트
          </a>
        </div>
        <div
          className={path === '/' ? cx('filter') : cx('blind')}
          role="presentation"
          onClick={openFilter}
        >
          {filterValue}
          <img
            src="https://cdn-icons-png.flaticon.com/512/60/60995.png"
            alt="more"
          />
        </div>
        <div className={path === '/' && filterOn ? cx('box') : cx('blind')}>
          <div className={cx('content')}>
            <ul>
              <li
                onClick={changeFilter}
                role="presentation"
                className={filterValue === '오늘' ? cx('selected') : ''}
              >
                오늘
              </li>
              <li
                onClick={changeFilter}
                role="presentation"
                className={filterValue === '이번 주' ? cx('selected') : ''}
              >
                이번 주
              </li>
              <li
                onClick={changeFilter}
                role="presentation"
                className={filterValue === '이번 달' ? cx('selected') : ''}
              >
                이번 달
              </li>
              <li
                onClick={changeFilter}
                role="presentation"
                className={filterValue === '올해' ? cx('selected') : ''}
              >
                올해
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={cx('right')}>
        <a className={cx('tag-button')} href="/tags">
          # 태그 목록
        </a>
      </div>
    </div>
  );
}
