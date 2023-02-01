import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment/moment';
// eslint-disable-next-line import/extensions,import/no-unresolved
import classNames from 'classnames/bind';
// eslint-disable-next-line import/extensions,import/no-unresolved
import Header from '../components/Header';
// eslint-disable-next-line import/extensions,import/no-unresolved
import styles from './PersonalSeriesName.module.scss';
// eslint-disable-next-line import/extensions,import/no-unresolved
import { user, seriesDetail, seriesPost, post } from '../contexts/types';

const cx = classNames.bind(styles);

const dummyPost: post = {
  pid: 1,
  title: 'title',
  author: 'id',
  url: '/userid/posttitle',
  preview: 'preview',
  thumbnail: 'thm',
  tags: ['tag1', 'tag2', 'tag3'],
  created_at: '2020-02-20 20:20:20',
  updated_at: '2020-02-20 20:20:20',
  comments: 2,
  likes: 77,
  is_private: false,
};

const dummySeriesPost: seriesPost = {
  series_id: 1,
  post: dummyPost,
};
const dummySeriesPost2: seriesPost = {
  series_id: 2,
  post: dummyPost,
};

const dummySeriesDetail: seriesDetail = {
  id: 1,
  title: 'series',
  photo: 'photo',
  update: '2020-02-20 20:20:20',
  author: 'id',
  postNum: 2,
  postList: [dummySeriesPost, dummySeriesPost2],
};

function PersonalSeriesName() {
  const [rotate, setRotate] = useState(false);

  const [sortedList, setList] = useState(
    rotate ? dummySeriesDetail.postList : dummySeriesDetail.postList.reverse()
  );
  const changeOrder = () => {
    setRotate(!rotate);
    const reverseList = sortedList.reverse();
    setList(reverseList);
  };

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
    }, [rotate]);
    return agoFormat;
  }

  return (
    <div className={cx('page')}>
      <Header />
      <div className={cx('pageBody')}>
        <div>
          <span className={cx('label')}>시리즈</span>
          <h1>{dummySeriesDetail.title}</h1>
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
              {sortedList.map((postInfo: seriesPost) => (
                <div className={cx('postDiv')} key={postInfo.series_id}>
                  <h2>
                    <span>{postInfo.series_id}.</span>
                    <Link to={`/@${postInfo.post.author}/${postInfo.post.url}`}>
                      {postInfo.post.title}
                    </Link>
                  </h2>
                  <section>
                    <Link to={`/@${postInfo.post.author}/${postInfo.post.url}`}>
                      <img src={postInfo.post.thumbnail} alt="post-thumbnail" />
                    </Link>
                    <div className={cx('postInfo')}>
                      <p>{postInfo.post.preview}</p>
                      <div className={cx('date')}>
                        {timeSetting(postInfo.post.created_at)}
                      </div>
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
