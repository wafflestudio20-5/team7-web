import React, { useState } from 'react';
// eslint-disable-next-line import/extensions,import/no-unresolved
import classNames from 'classnames/bind';
// eslint-disable-next-line import/extensions,import/no-unresolved
import Header from '../components/Header';
// eslint-disable-next-line import/extensions,import/no-unresolved
import styles from './PersonalSeriesName.module.scss';

const cx = classNames.bind(styles);

const series = {
  id: 1,
  title: '내 시리즈',
  photo: 'https://pbs.twimg.com/media/Ct9Zp2UVYAAcnEt.jpg',
  update: '2022년 12월 6일',
  authorId: '2-0-is',
  postNum: 25,
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
const seriesPosts: post[] = [
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
];

function PersonalSeriesName() {
  const [rotate, setRotate] = useState(false);

  const changeOrder = () => {
    setRotate(!rotate);
  };
  return (
    <div className={cx('page')}>
      <Header />
      <div className={cx('pageBody')}>
        <div>
          <span className={cx('label')}>시리즈</span>
          <h1>{series.title}</h1>
          <div className={cx('line')} />
          <section>
            <div className={cx('sortRule')}>
              <button
                className={cx('button')}
                type="button"
                onClick={changeOrder}
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  data-testid="arrow"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  className={cx(rotate ? 'rotate' : 'none')}
                >
                  <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
                </svg>
                {!rotate && <span>오름차순</span>}
                {rotate && <span>내림차순</span>}
              </button>
            </div>
            <div className={cx('postList')}>
              {seriesPosts.map((postInfo: post) => (
                <div className={cx('postDiv')}>
                  <h2>
                    <span>{postInfo.seriesId}.</span>
                    <a href={`/@${postInfo.authorId}/${postInfo.url}`}>
                      {postInfo.title}
                    </a>
                  </h2>
                  <section>
                    <a href={`/@${postInfo.authorId}/${postInfo.url}`}>
                      <img src={postInfo.thumbnail} alt="post-thumbnail" />
                    </a>
                    <div className={cx('postInfo')}>
                      <p>{postInfo.intro}</p>
                      <div className={cx('date')}>{postInfo.date}</div>
                    </div>
                  </section>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default PersonalSeriesName;
