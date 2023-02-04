import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import moment from 'moment/moment';
import styles from '../pages/PersonalSeries.module.scss';
import { series } from '../contexts/types';

const cx = classNames.bind(styles);

type series_type = {
  seriesInfo: series;
};

function SeriesComp({ seriesInfo }: series_type) {
  const timeNow = moment();
  const timePost = moment(seriesInfo.update);

  const [agoFormat, setAgoFormat] = useState('YYYY-MM-DD');
  const timeDiff = timeNow.diff(timePost);

  useEffect(() => {
    if (timeDiff < 1000 * 60 * 60)
      setAgoFormat(`${Math.floor(timeDiff / (1000 * 60))}분 전`);
    else if (timeDiff < 1000 * 60 * 60 * 24)
      setAgoFormat(`${Math.floor(timeDiff / (1000 * 60 * 60))}시간 전`);
    else if (timeDiff < 1000 * 60 * 60 * 24 * 7)
      setAgoFormat(`${Math.floor(timeDiff / (1000 * 60 * 60 * 24))}일 전`);
    else setAgoFormat(timePost.format('YYYY년 MM월 DD일'));
  }, []);

  return (
    <div className={cx('seriesDiv')}>
      <Link
        to={`/@${seriesInfo.author}/series/${seriesInfo.url}`}
        className={cx('link')}
      >
        <div>
          <img
            src={
              seriesInfo.photo && seriesInfo.photo[0] === '/'
                ? `https://api.7elog.store${seriesInfo.photo}`
                : seriesInfo.photo
            }
            alt="thumbnail"
          />
        </div>
      </Link>
      <h4>
        <Link
          to={`/@${seriesInfo.author}/series/${seriesInfo.url}`}
          className={cx('link')}
        >
          {seriesInfo.series_name}
        </Link>
      </h4>
      <div className={cx('subInfo')}>
        <span className={cx('count')}>{seriesInfo.postNum}개의 포스트</span>
        <span className={cx('dot')}>·</span>
        마지막 업데이트 {agoFormat}
      </div>
    </div>
  );
}

export default SeriesComp;
