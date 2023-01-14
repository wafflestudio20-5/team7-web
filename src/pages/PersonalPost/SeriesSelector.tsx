import React, { useState } from 'react';
import styles from './SeriesSelector.module.scss';
import { ReactComponent as SeriesIcon } from '../../assets/series_mark.svg';
import { ReactComponent as UpTriangleIcon } from '../../assets/up_triangle.svg';
import { ReactComponent as DownTriangleIcon } from '../../assets/down_triangle.svg';
import { ReactComponent as LeftIcon } from '../../assets/left_mark.svg';
import { ReactComponent as RightIcon } from '../../assets/right_mark.svg';

export default function SeriesSelector() {
  const [listVisible, setListVisible] = useState(false);

  const toggleList = () => {
    setListVisible(x => !x);
  };

  return (
    <div className={styles.series_container}>
      <h2>
        <a href="/@username/series/seriesname">seriesname</a>
      </h2>
      <SeriesIcon className={styles.series_mark} />
      {listVisible && (
        <ol className={styles.list}>
          <li>
            <a
              href="/@username/post"
              style={{ color: 'var(--primary1)', fontWeight: 'bold' }}
            >
              one
            </a>
          </li>
          <li>
            <a href="/@username/post">two</a>
          </li>
        </ol>
      )}
      <div className={styles.list_actions}>
        <div
          className={styles.see_hide_container}
          onClick={toggleList}
          role="presentation"
        >
          {listVisible ? <UpTriangleIcon /> : <DownTriangleIcon />}
          {listVisible ? '숨기기' : '목록 보기'}
        </div>
        <div className={styles.series_number_container}>
          <div className={styles.series_number}>1/2</div>
          <div className={styles.button_container}>
            <button type="button" disabled>
              <LeftIcon />
            </button>
            <button type="button">
              <RightIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
