import React, { useState } from 'react';
// eslint-disable-next-line import/extensions,import/no-unresolved
import classNames from 'classnames/bind';
// eslint-disable-next-line import/extensions,import/no-unresolved
import Header from '../components/Header';
// eslint-disable-next-line import/extensions,import/no-unresolved
import styles from './PersonalSeriesName.module.scss';
// eslint-disable-next-line import/extensions,import/no-unresolved
import { user, seriesDetail, seriesPost } from '../contexts/types';

const cx = classNames.bind(styles);

const exampleUser: user = {
  id: '2-0-is',
  velog_name: '2-0-is_velog',
  username: '이영은',
  userImg: '',
  description: '이영은의 벨로그',
  github: '2-0-is',
  twitter: 'twitter',
  facebook: 'facebook',
  homepage: 'https://localhost:3000',
  mail: 'yuye2002@snu.ac.kr',
};

const detailedSeries: seriesDetail = {
  id: 1,
  title: '내 시리즈',
  photo: 'https://pbs.twimg.com/media/Ct9Zp2UVYAAcnEt.jpg',
  update: '2022년 12월 6일',
  authorId: '2-0-is',
  postNum: 25,
  postList: [
    {
      series_id: 1,
      post: {
        id: 1,
        title: '첫 번째 포스트 제목입니다',
        author: exampleUser,
        url: 'post-title-1',
        preview: '포스트를 소개해주세요.',
        thumbnail: 'https://pbs.twimg.com/media/Ct9Zp2UVYAAcnEt.jpg',
        tags: ['tagA', 'tagB', 'tagC'],
        created_at: '2022-12-30',
        updated_at: '2022-12-31',
        comments: 23,
        likes: 45,
        is_private: false,
      },
    },
    {
      series_id: 2,
      post: {
        id: 2,
        title: '두 번째 포스트 제목입니다',
        author: exampleUser,
        url: 'post-title-2',
        preview: '포스트를 소개해주세요.',
        thumbnail: 'https://pbs.twimg.com/media/Ct9Zp2UVYAAcnEt.jpg',
        tags: ['tagA', 'tagB', 'tagC'],
        created_at: '2022-12-30',
        updated_at: '2022-12-31',
        comments: 23,
        likes: 45,
        is_private: false,
      },
    },
    {
      series_id: 3,
      post: {
        id: 3,
        title: '세 번째 포스트 제목입니다',
        author: exampleUser,
        url: 'post-title-3',
        preview: '포스트를 소개해주세요.',
        thumbnail: 'https://pbs.twimg.com/media/Ct9Zp2UVYAAcnEt.jpg',
        tags: ['tagA', 'tagB', 'tagC'],
        created_at: '2022-12-30',
        updated_at: '2022-12-31',
        comments: 23,
        likes: 45,
        is_private: false,
      },
    },
  ],
};

function PersonalSeriesName() {
  const [rotate, setRotate] = useState(false);

  const [sortedList, setList] = useState(
    rotate ? detailedSeries.postList : detailedSeries.postList.reverse()
  );
  const changeOrder = () => {
    setRotate(!rotate);
    const reverseList = sortedList.reverse();
    setList(reverseList);
  };

  return (
    <div className={cx('page')}>
      <Header />
      <div className={cx('pageBody')}>
        <div>
          <span className={cx('label')}>시리즈</span>
          <h1>{detailedSeries.title}</h1>
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
                    <a
                      href={`/@${postInfo.post.author.id}/${postInfo.post.url}`}
                    >
                      {postInfo.post.title}
                    </a>
                  </h2>
                  <section>
                    <a
                      href={`/@${postInfo.post.author.id}/${postInfo.post.url}`}
                    >
                      <img src={postInfo.post.thumbnail} alt="post-thumbnail" />
                    </a>
                    <div className={cx('postInfo')}>
                      <p>{postInfo.post.preview}</p>
                      <div className={cx('date')}>
                        {postInfo.post.created_at}
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
