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
import { series, user, userDetail } from '../contexts/types';

const cx = classNames.bind(styles);

const currentUser: user = {
  id: 'myId',
  velog_name: 'my_velog',
  email: 'mail',
  username: '이름',
  userImg: '',
  description: '내 벨로그',
  github: 'github',
  twitter: 'twitter',
  facebook: 'facebook',
  homepage: 'https://localhost:3000',
  mail: 'myId@snu.ac.kr',
};

const detailedUser: userDetail = {
  id: 'myId',
  velog_name: 'my_velog',
  email: 'mail',
  username: '이름',
  userImg: '',
  description: '내 벨로그',
  github: 'github',
  twitter: 'twitter',
  facebook: 'facebook',
  homepage: 'https://localhost:3000',
  mail: 'myId@snu.ac.kr',
  tags: ['tagA', 'tagB', 'tagC'],
  posts: [
    {
      id: 1,
      title: '포스트 제목입니다',
      author: currentUser,
      url: 'post-title-1',
      preview: '포스트를 소개해주세요.',
      thumbnail: 'https://pbs.twimg.com/media/Ct9Zp2UVYAAcnEt.jpg',
      tags: ['tagA', 'tagB', 'tagC'],
      created_at: '2023-01-26 12:30:10',
      updated_at: '2023-01-26 12:30:10',
      comments: 23,
      likes: 45,
      is_private: false,
    },
    {
      id: 2,
      title: '포스트 제목입니다',
      author: currentUser,
      url: 'post-title-2',
      preview: '포스트를 소개해주세요.',
      thumbnail: 'https://pbs.twimg.com/media/Ct9Zp2UVYAAcnEt.jpg',
      tags: ['tagA', 'tagB', 'tagC'],
      created_at: '2023-01-23 12:30:10',
      updated_at: '2023-01-23 12:30:10',
      comments: 23,
      likes: 45,
      is_private: false,
    },
    {
      id: 3,
      title: '포스트 제목입니다',
      author: currentUser,
      url: 'post-title-3',
      preview: '포스트를 소개해주세요.',
      thumbnail: 'https://pbs.twimg.com/media/Ct9Zp2UVYAAcnEt.jpg',
      tags: ['tagA', 'tagB', 'tagC'],
      created_at: '2023-01-26 16:10:10',
      updated_at: '2023-01-26 16:10:10',
      comments: 23,
      likes: 45,
      is_private: false,
    },
    {
      id: 4,
      title: '포스트 제목입니다',
      author: currentUser,
      url: 'post-title-4',
      preview: '포스트를 소개해주세요.',
      thumbnail: 'https://pbs.twimg.com/media/Ct9Zp2UVYAAcnEt.jpg',
      tags: ['tagA', 'tagB', 'tagC'],
      created_at: '2023-01-26 12:30:10',
      updated_at: '2023-01-26 12:30:10',
      comments: 23,
      likes: 45,
      is_private: true,
    },
  ],
  series: [
    {
      id: 1,
      title: '내 시리즈',
      url: 'url',
      photo: 'https://pbs.twimg.com/media/Ct9Zp2UVYAAcnEt.jpg',
      update: '2023-01-26 15:10:10',
      authorId: 'myId',
      postNum: 12,
    },
  ],
  about: '<h1>내 벨로그입니다.</h1>',
};

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
        {detailedUser.series.map((seriesInfo: series) => (
          <div className={cx('seriesDiv')}>
            <Link
              to={`/@${seriesInfo.authorId}/series/${seriesInfo.url}`}
              className={cx('link')}
            >
              <div>
                <img src={seriesInfo.photo} alt="thumbnail" />
              </div>
            </Link>
            <h4>
              <Link
                to={`/@${seriesInfo.authorId}/series/${seriesInfo.url}`}
                className={cx('link')}
              >
                {seriesInfo.title}
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
