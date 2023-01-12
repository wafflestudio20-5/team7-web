import React from 'react';
// eslint-disable-next-line import/extensions,import/no-unresolved
import classNames from 'classnames/bind';
// eslint-disable-next-line import/extensions,import/no-unresolved
import styles from './Tags.module.scss';
// eslint-disable-next-line import/extensions,import/no-unresolved
import Header from '../components/Header';

const cx = classNames.bind(styles);
const sortTab = new URLSearchParams(window.location.search).get('sort');

interface tag {
  name: string;
  thumbnail: string;
  intro: string;
  postCount: number;
}
const tagList: tag[] = [
  {
    name: 'JavaScript',
    thumbnail: 'https://pbs.twimg.com/media/Ct9Zp2UVYAAcnEt.jpg',
    intro: '자바스크립트 태그입니다.',
    postCount: 1234,
  },
  {
    name: 'TypeScript',
    thumbnail: 'https://pbs.twimg.com/media/Ct9Zp2UVYAAcnEt.jpg',
    intro: '타입스크립트 태그입니다.',
    postCount: 4321,
  },
  {
    name: 'Python',
    thumbnail: 'https://pbs.twimg.com/media/Ct9Zp2UVYAAcnEt.jpg',
    intro: '',
    postCount: 56,
  },
  {
    name: 'TIL',
    thumbnail: 'https://pbs.twimg.com/media/Ct9Zp2UVYAAcnEt.jpg',
    intro:
      'Today I Learned의 준말로서, 오늘 배운 것들을 기록하는 것을 의미합니다.',
    postCount: 100,
  },
]; // sortTab 이용해서 불러오기

function Tags() {
  return (
    <div className={cx('page')}>
      <Header />
      <main>
        <div className={cx('sortDiv')}>
          <div className={cx('tabWrapper')}>
            <a
              href="/tags?sort=trending"
              className={cx(
                'tab',
                sortTab !== 'alphabetical' ? 'active' : 'none'
              )}
            >
              인기순
            </a>
            <a
              href="/tags?sort=alphabetical"
              className={cx(
                'tab',
                sortTab === 'alphabetical' ? 'active' : 'none'
              )}
            >
              이름순
            </a>
            <div
              className={cx(
                'line',
                sortTab === 'alphabetical' ? 'alphabetical' : 'trending'
              )}
            />
          </div>
        </div>
        <section className={cx('tagSection')}>
          {tagList.map((tagInfo: tag) => (
            <div className={cx('tagComp')}>
              <div>
                <a href={`/tags/${tagInfo.name}`} className={cx('title')}>
                  {tagInfo.name}
                </a>
                <p>{tagInfo.intro}</p>
              </div>
              <div className={cx('count')}>
                총 {tagInfo.postCount}개의 포스트
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default Tags;
