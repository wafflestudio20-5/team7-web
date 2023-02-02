import React, { useEffect, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line import/extensions,import/no-unresolved
import classNames from 'classnames/bind';
// eslint-disable-next-line import/extensions,import/no-unresolved
import axios from 'axios';
import styles from './Tags.module.scss';
// eslint-disable-next-line import/extensions,import/no-unresolved
import Header from '../components/Header';

const cx = classNames.bind(styles);

type tagGetType = {
  tag_name: string;
  postCount: number;
};

function Tags() {
  const [sortTab, setSortTab] = useState('trending');
  function toggle() {
    if (sortTab === 'alphabetical') setSortTab('trending');
    else setSortTab('alphabetical');
  }
  const [tagList, setTags] = useState([]);

  const getTags = useCallback(async () => {
    try {
      const response = await axios.get(`/api/v1/velog/tags`);
      setTags(response.data);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    getTags();
  }, []);

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
          {tagList.map((tagInfo: tagGetType) => (
            <div className={cx('tagComp')}>
              <div>
                <Link to={`/tags/${tagInfo.tag_name}`} className={cx('title')}>
                  {tagInfo.tag_name}
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
