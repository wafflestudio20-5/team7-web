import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './HomeContents.module.scss';

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
          <span>by 작성자</span>
        </a>
        <div className={cx('likes')}>♥ 77</div>
      </div>
    </div>
  );
}

export default function HomeContents() {
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

  function useScrollDirection() {
    const [scrollDirection, setScrollDirection] = useState('up');

    useEffect(() => {
      let lastScrollY = window.pageYOffset;

      const updateScrollDirection = () => {
        const scrollY = window.pageYOffset;
        const direction = scrollY > lastScrollY ? 'down' : 'up';
        if (
          direction !== scrollDirection &&
          (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)
        ) {
          setScrollDirection(direction);
        }
        lastScrollY = scrollY > 0 ? scrollY : 0;
      };
      window.addEventListener('scroll', updateScrollDirection); // add event listener
      return () => {
        window.removeEventListener('scroll', updateScrollDirection); // clean up
      };
    }, [scrollDirection]);

    return scrollDirection;
  }
  const scrollDirection = useScrollDirection();

  return (
    <div className={cx('contents')}>
      <div className={scrollDirection === 'down' ? cx('blind') : cx('middle')}>
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
              className={path === '/lists/liked' ? cx('highlight') : ''}
            >
              좋아한 포스트
            </a>
            <a
              href="/lists/read"
              className={path === '/lists/read' ? cx('highlight') : ''}
            >
              최근 읽은 포스트
            </a>
            <a
              href="/lists/following"
              className={path === '/lists/following' ? cx('highlight') : ''}
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
            # 태그
          </a>
        </div>
      </div>
      <div className={cx('container')}>
        <main>
          <div className={cx('posts')}>
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
