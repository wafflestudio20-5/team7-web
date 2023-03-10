import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './HeaderFilter.module.scss';
import { useDateFilter } from '../contexts/DateProvider';

const cx = classNames.bind(styles);

export default function HeaderFilter() {
  const path = useLocation().pathname;
  const { dateFilter, setDateFilter } = useDateFilter();

  const [filterOn, setFilterOn] = useState(false);
  const [filterValue, setFilterValue] = useState('오늘');
  const [underlinePos, setUnderlinePos] = useState(0);
  const [underlineDest, setUnderlineDest] = useState(0);

  function openFilter() {
    if (filterOn === false) {
      setFilterOn(true);
    } else {
      setFilterOn(false);
    }
  }

  function changeFilter(e: any) {
    setFilterValue(e.target.innerHTML);
    switch (e.target.innerHTML) {
      case '올해':
        setDateFilter('year');
        break;
      case '이번 달':
        setDateFilter('month');
        break;
      case '이번 주':
        setDateFilter('week');
        break;
      default:
        setDateFilter('today');
        break;
    }
    setFilterOn(false);
  }

  useEffect(() => {
    switch (dateFilter) {
      case 'year':
        setFilterValue('올해');
        break;
      case 'month':
        setFilterValue('이번 달');
        break;
      case 'week':
        setFilterValue('이번 주');
        break;
      default:
        setFilterValue('오늘');
        break;
    }
  }, [dateFilter]);

  useEffect(() => {
    if (path === '/') setUnderlineDest(0);
    else if (path === '/recent') setUnderlineDest(112);
    else if (path === '/lists/liked') setUnderlineDest(0);
    else if (path === '/lists/read') setUnderlineDest(144);
  }, [path]);

  useEffect(() => {
    const initialDist = underlineDest - underlinePos;
    setUnderlinePos(underlinePos + initialDist * 1.09);
    const timer1 = setTimeout(() => {
      setUnderlinePos(underlinePos + initialDist * 0.99);
    }, 300);
    const timer2 = setTimeout(() => {
      setUnderlinePos(underlinePos + initialDist);
    }, 600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [underlineDest]);

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
          <Link to="/" className={path === '/' ? cx('highlight') : ''}>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
            </svg>
            트렌딩
          </Link>
          <Link to="/recent" className={path === '/' ? '' : cx('highlight')}>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
            </svg>
            최신
          </Link>
        </div>
        <div
          className={
            path === '/' || path === '/recent' ? cx('blind') : cx('devider')
          }
        >
          <Link
            to="/lists/liked"
            className={
              path === '/lists/liked' ? cx('highlight', 'wider') : cx('wider')
            }
          >
            좋아한 포스트
          </Link>
          <Link
            to="/lists/read"
            className={
              path === '/lists/read' ? cx('highlight', 'wider') : cx('wider')
            }
          >
            최근 읽은 포스트
          </Link>
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
        <Link className={cx('tag-button')} to="/tags">
          # 태그 목록
        </Link>
      </div>
      <div
        className={cx('underline')}
        style={{
          width: path === '/' || path === '/recent' ? '112px' : '144px',
          transform: `translate(${underlinePos}px)`,
          transition: `transform 0.3s ease-out 0s`,
        }}
      />
    </div>
  );
}
