import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
// eslint-disable-next-line import/extensions,import/no-unresolved
import classNames from 'classnames/bind';
// eslint-disable-next-line import/extensions,import/no-unresolved
import Header from '../components/Header';
// eslint-disable-next-line import/extensions,import/no-unresolved
import UserIntro from '../components/UserIntro';
// eslint-disable-next-line import/extensions,import/no-unresolved
import styles from './PersonalSeries.module.scss';
// eslint-disable-next-line import/extensions,import/no-unresolved
import {
  series,
  seriesDetail,
  seriesPost,
  user,
  userDetail,
} from '../contexts/types';

const cx = classNames.bind(styles);

const currentUser: user = {
  username: 'id',
  velog_name: 'myvelog.log',
  email: 'mail',
  name: '이름',
  profile_image: '',
  introduction: 'desc',
  github: 'github',
  twitter: 'twitter',
  facebook: 'facebook',
  homepage: 'https://localhost:3000',
  mail: 'yuye2002@snu.ac.kr',
  about: 'about',
};

const dummySeries: series[] = [
  {
    id: 1,
    series_name: 'series',
    url: 'seriesName',
    photo: '',
    update: '2022-02-02 00:01:11',
    author: 'id',
    postNum: 2,
  },
];

function PersonalSeries() {
  const timeNow = moment();

  function timeSetting(timeComp: string) {
    const timeSeries = moment(timeComp);
    const [agoFormat, setAgoFormat] = useState('YYYY-MM-DD');
    const timeDiff = timeNow.diff(timeSeries);

    useEffect(() => {
      if (timeDiff < 1000 * 60 * 60)
        setAgoFormat(`${Math.floor(timeDiff / (1000 * 60))}분 전`);
      else if (timeDiff < 1000 * 60 * 60 * 24)
        setAgoFormat(`${Math.floor(timeDiff / (1000 * 60 * 60))}시간 전`);
      else if (timeDiff < 1000 * 60 * 60 * 24 * 7)
        setAgoFormat(`${Math.floor(timeDiff / (1000 * 60 * 60 * 24))}일 전`);
      else setAgoFormat(timeSeries.format('YYYY년 MM월 DD일'));
    }, []);
    return agoFormat;
  }

  return (
    <div>
      <div className={cx('seriesList')}>
        {dummySeries.map((seriesInfo: series) => (
          <div className={cx('seriesDiv')}>
            <Link
              to={`/@${seriesInfo.author}/series/${seriesInfo.url}`}
              className={cx('link')}
            >
              <div>
                <img src={seriesInfo.photo} alt="thumbnail" />
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
              <span className={cx('count')}>
                {seriesInfo.postNum}개의 포스트
              </span>
              <span className={cx('dot')}>·</span>
              마지막 업테이트 {timeSetting(seriesInfo.update)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PersonalSeries;
