import React, { useState } from 'react';
// eslint-disable-next-line import/extensions,import/no-unresolved
import classNames from 'classnames/bind';
// eslint-disable-next-line import/extensions,import/no-unresolved
import Header from '../components/Header';
// eslint-disable-next-line import/extensions,import/no-unresolved
import BigPostComp from '../components/BigPostComp';
// eslint-disable-next-line import/extensions,import/no-unresolved
import styles from './Personal.module.scss';

const cx = classNames.bind(styles);

const user = {
  username: '2-0-is',
  userImg: '',
  description: '이영은의 벨로그',
  github: '2-0-is',
  twitter: 'twitter',
  facebook: 'facebook',
  homepage: 'https://localhost:3000',
  mail: 'yuye2002@snu.ac.kr',
  tags: ['새태그'],
  posts: [
    {
      id: 1,
      title: '포스트 제목입니다',
      url: 'post-title-1',
      intro: '포스트를 소개해주세요.',
      thumbnail: 'https://pbs.twimg.com/media/Ct9Zp2UVYAAcnEt.jpg',
      seriesTitle: 'series1',
      seriesId: 1,
      tags: ['tagA', 'tagB', 'tagC'],
      date: '2022년 10월 31일',
      comments: 10,
      authorId: '2-0-is',
      authorImg: '',
      heart: 10,
    },
    {
      id: 2,
      title: '포스트 제목입니다',
      url: 'post-title-2',
      intro: '포스트를 소개해주세요.',
      thumbnail: 'https://pbs.twimg.com/media/Ct9Zp2UVYAAcnEt.jpg',
      seriesTitle: 'series1',
      seriesId: 2,
      tags: ['tagA', 'tagB', 'tagC'],
      date: '2022년 10월 31일',
      comments: 10,
      authorId: '2-0-is',
      authorImg: '',
      heart: 10,
    },
    {
      id: 3,
      title: '포스트 제목입니다',
      url: 'post-title-3',
      intro: '포스트를 소개해주세요.',
      thumbnail: 'https://pbs.twimg.com/media/Ct9Zp2UVYAAcnEt.jpg',
      seriesTitle: 'series1',
      seriesId: 3,
      tags: ['tagA', 'tagB', 'tagC'],
      date: '2022년 10월 31일',
      comments: 10,
      authorId: '2-0-is',
      authorImg: '',
      heart: 10,
    },
    {
      id: 4,
      title: '포스트 제목입니다',
      url: 'post-title-4',
      intro: '포스트를 소개해주세요.',
      thumbnail: 'https://pbs.twimg.com/media/Ct9Zp2UVYAAcnEt.jpg',
      seriesTitle: '',
      seriesId: 0,
      tags: [],
      date: '2022년 10월 31일',
      comments: 10,
      authorId: '2-0-is',
      authorImg: '',
      heart: 10,
    },
  ],
  series: [],
  about: '<h1>벨로그에 오신 것을 환영합니다.</h1>',
};

interface post {
  id: number;
  title: string;
  url: string;
  intro: string;
  thumbnail: string;
  seriesTitle: string;
  seriesId: number;
  tags: string[];
  date: string;
  comments: number;
  authorId: string;
  authorImg: string;
  heart: number;
}

function Personal() {
  const [query, setQuery] = useState('');
  function getPostnum(tag: string) {
    return tag.length;
  }
  const tagQuery = new URLSearchParams(window.location.search).get('tag');

  return (
    <div className={cx('page')}>
      <Header />
      <div className={cx('pageContent')}>
        <div className={cx('user')}>
          <div className={cx('intro')}>
            <a href={`/@${user.username}`}>
              <img src={user.userImg} alt="profile" />
            </a>
            <div className={cx('textIntro')}>
              <div className={cx('name')}>
                <a href={`/@${user.username}`}>{user.username}</a>
              </div>
              <div className={cx('description')}>{user.description}</div>
            </div>
          </div>
          <div className={cx('line')} />
          <div className={cx('snsPages')}>
            {user.github !== '' && (
              <a href={`https://github.com/${user.github}`}>
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <mask
                    id="github"
                    width="20"
                    height="20"
                    x="0"
                    y="0"
                    maskUnits="userSpaceOnUse"
                  >
                    <path
                      fill="#ffffff"
                      fillRule="evenodd"
                      d="M6.69 15.944c0 .08-.093.145-.21.145-.133.012-.226-.053-.226-.145 0-.081.093-.146.21-.146.12-.012.226.053.226.146zm-1.255-.182c-.028.08.053.173.174.198.105.04.226 0 .25-.081.024-.08-.053-.173-.174-.21-.104-.028-.221.012-.25.093zm1.783-.068c-.117.028-.198.104-.186.197.012.08.117.133.238.105.117-.028.198-.105.186-.186-.012-.076-.121-.129-.238-.116zM9.87.242C4.278.242 0 4.488 0 10.08c0 4.471 2.815 8.298 6.835 9.645.516.093.697-.226.697-.488 0-.25-.012-1.63-.012-2.476 0 0-2.822.605-3.415-1.202 0 0-.46-1.173-1.121-1.475 0 0-.924-.633.064-.621 0 0 1.004.08 1.557 1.04.883 1.557 2.363 1.109 2.94.843.092-.645.354-1.093.645-1.36-2.255-.25-4.529-.576-4.529-4.455 0-1.109.307-1.665.952-2.375-.105-.262-.448-1.342.105-2.738C5.56 4.157 7.5 5.51 7.5 5.51a9.474 9.474 0 0 1 2.532-.344c.86 0 1.726.117 2.533.343 0 0 1.939-1.355 2.782-1.089.552 1.4.21 2.476.105 2.738.645.714 1.04 1.27 1.04 2.375 0 3.891-2.375 4.202-4.63 4.456.372.319.686.923.686 1.87 0 1.36-.012 3.041-.012 3.372 0 .262.186.58.698.488C17.266 18.379 20 14.552 20 10.08 20 4.488 15.464.24 9.871.24zM3.919 14.149c-.052.04-.04.133.029.21.064.064.157.093.21.04.052-.04.04-.133-.029-.21-.064-.064-.157-.092-.21-.04zm-.435-.326c-.028.052.012.117.093.157.064.04.145.028.173-.028.028-.053-.012-.117-.093-.158-.08-.024-.145-.012-.173.029zm1.306 1.435c-.064.053-.04.174.053.25.092.093.21.105.262.04.052-.052.028-.173-.053-.25-.088-.092-.21-.104-.262-.04zm-.46-.593c-.064.04-.064.146 0 .238.065.093.174.133.226.093.065-.053.065-.157 0-.25-.056-.093-.16-.133-.225-.08z"
                      clipRule="evenodd"
                    />
                  </mask>
                  <g mask="url(#github)">
                    <path fill="currentColor" d="M0 0h20v20H0z" />
                  </g>
                </svg>
              </a>
            )}
            {user.twitter !== '' && (
              <a href={`https://twitter.com/${user.twitter}`}>
                <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
                  <path
                    fill="currentColor"
                    d="M32 6.076a13.108 13.108 0 0 1-3.77 1.033 6.576 6.576 0 0 0 2.886-3.632 13.151 13.151 0 0 1-4.17 1.594 6.554 6.554 0 0 0-4.791-2.074c-4.239 0-7.354 3.955-6.396 8.06C10.304 10.784 5.467 8.171 2.228 4.2a6.574 6.574 0 0 0 2.03 8.765 6.538 6.538 0 0 1-2.971-.821c-.072 3.041 2.108 5.886 5.265 6.52-.924.25-1.936.309-2.965.112a6.57 6.57 0 0 0 6.133 4.558A13.2 13.2 0 0 1 0 26.053a18.585 18.585 0 0 0 10.064 2.95c12.19 0 19.076-10.295 18.66-19.528A13.366 13.366 0 0 0 32 6.076z"
                  />
                </svg>
              </a>
            )}
            {user.facebook !== '' && (
              <a href={`https://facebook.com/${user.facebook}`}>
                <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
                  <path
                    fill="currentColor"
                    d="M32 5.334C32 2.53 29.47 0 26.667 0H5.333C2.53 0 0 2.531 0 5.334v21.332C0 29.47 2.53 32 5.334 32H16V19.911h-3.911v-5.333H16V12.5c0-3.584 2.69-6.811 6-6.811h4.311v5.333H22c-.472 0-1.022.573-1.022 1.431v2.125h5.333v5.333h-5.333V32h5.689C29.47 32 32 29.469 32 26.666V5.334z"
                  />
                </svg>
              </a>
            )}
            {user.homepage !== '' && (
              <a href={user.homepage}>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </svg>
              </a>
            )}
            {user.mail !== '' && (
              <a href={`mailto:${user.mail}`}>
                <svg
                  width="32"
                  height="32"
                  fill="none"
                  viewBox="0 0 32 32"
                  data-testid="email"
                >
                  <path
                    fill="currentColor"
                    d="M16 16.871L1.019 5H30.98L16 16.871zm0 3.146L1 8.131V27h30V8.131L16 20.017z"
                  />
                </svg>
              </a>
            )}
          </div>
        </div>
        <div>
          <div className={cx('pageIndex')}>
            <a href={`/@${user.username}`} className={cx('index', 'active')}>
              글
            </a>
            <a href={`/@${user.username}/series`} className={cx('index')}>
              시리즈
            </a>
            <a href={`/@${user.username}/about`} className={cx('index')}>
              소개
            </a>
            <div className={cx('activeLine')} />
          </div>
        </div>
        <div>
          <div>
            <section className={cx('searchSection')}>
              <div className={cx('box')}>
                <svg width="17" height="17" viewBox="0 0 17 17">
                  <path
                    fillRule="evenodd"
                    d="M13.66 7.36a6.3 6.3 0 1 1-12.598 0 6.3 6.3 0 0 1 12.598 0zm-1.73 5.772a7.36 7.36 0 1 1 1.201-1.201l3.636 3.635c.31.31.31.815 0 1.126l-.075.075a.796.796 0 0 1-1.126 0l-3.636-3.635z"
                    clipRule="evenodd"
                    fill="currentColor"
                  />
                </svg>
                <input
                  placeholder="검색어를 입력하세요"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                />
              </div>
            </section>
          </div>
          <div className={cx('tagDiv')}>
            <div>
              <div className={cx('tagList')}>
                <div>
                  <div className={cx('title')}>태그 목록</div>
                  <ul>
                    <li
                      className={cx(
                        'tagElem',
                        tagQuery === null ? 'tagActive' : 'none'
                      )}
                    >
                      <a href={`/@${user.username}`}>전체보기</a>
                      <span>({getPostnum('')})</span>
                    </li>
                    {user.tags.map((tag: string) => (
                      <li
                        className={cx(
                          'tagElem',
                          tagQuery === tag ? 'tagActive' : 'none'
                        )}
                      >
                        <a href={`/@${user.username}?tag=${tag}`}>{tag}</a>
                        <span>({getPostnum(tag)})</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="postList">
              {user.posts.map((postComp: post) => (
                <BigPostComp
                  key={postComp.id}
                  postInfo={postComp}
                  username={user.username}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Personal;
