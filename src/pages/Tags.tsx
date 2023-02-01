import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line import/extensions,import/no-unresolved
import classNames from 'classnames/bind';
// eslint-disable-next-line import/extensions,import/no-unresolved
import styles from './Tags.module.scss';
// eslint-disable-next-line import/extensions,import/no-unresolved
import Header from '../components/Header';
// eslint-disable-next-line import/extensions,import/no-unresolved
import { tag } from '../contexts/types';

const cx = classNames.bind(styles);

const tagList: tag[] = [
  {
    name: 'JavaScript',
    postCount: 1234,
  },
  {
    name: 'TypeScript',
    postCount: 4321,
  },
  {
    name: 'Python',
    postCount: 56,
  },
  {
    name: 'TIL',
    postCount: 100,
  },
]; // sortTab 이용해서 불러오기

function Tags() {
  const [sortTab, setSortTab] = useState('trending');
  function toggle() {
    if (sortTab === 'alphabetical') setSortTab('trending');
    else setSortTab('alphabetical');
  }

  return (
    <div className={cx('page')}>
      <Header />
      <main>
        <div className={cx('sortDiv')}>
          <div className={cx('tabWrapper')}>
            <div
              onClick={toggle}
              className={cx(
                'tab',
                sortTab !== 'alphabetical' ? 'active' : 'none'
              )}
              role="presentation"
            >
              인기순
            </div>
            <div
              onClick={toggle}
              className={cx(
                'tab',
                sortTab === 'alphabetical' ? 'active' : 'none'
              )}
              role="presentation"
            >
              이름순
            </div>
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
                <Link to={`/tags/${tagInfo.name}`} className={cx('title')}>
                  {tagInfo.name}
                </Link>
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
