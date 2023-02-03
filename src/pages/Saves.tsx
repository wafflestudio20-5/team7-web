import React from 'react';
import classNames from 'classnames/bind';
import Moment from 'react-moment';
import moment from 'moment';
import styles from './Saves.module.scss';
import Header from '../components/Header';
import HeaderMoving from '../components/HeaderMoving';
import {
  post,
  postDetail,
  seriesDetail,
  seriesPost,
  user,
} from '../contexts/types';
import { useModalActions } from '../contexts/ModalProvider';

const cx = classNames.bind(styles);

const dummyUser: user = {
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

const dummyPost: post = {
  pid: 1,
  title: 'title',
  author: 'id',
  url: '/userid/posttitle',
  preview: 'preview',
  thumbnail: 'thm',
  tags: [
    {
      name: 'html',
      postCount: 6,
    },
    {
      name: 'css',
      postCount: 6,
    },
  ],
  created_at: '2020-02-20 20:20:20',
  updated_at: '2023-01-22 20:20:20',
  comments: 2,
  likes: 77,
  is_private: false,
};

const dummySeriesPost: seriesPost = {
  series_order: 1,
  post: dummyPost,
};

const dummySeriesDetail: seriesDetail = {
  id: 1,
  series_name: 'series',
  photo: 'photo',
  update: '2020-02-20 20:20:20',
  author: 'id',
  postNum: 2,
  postList: [dummySeriesPost, dummySeriesPost],
};

const dummyPostDetail: postDetail = {
  ...dummyPost,
  content:
    '# title\n ## title2\n ### title3\n\n other title\n ---\n\n content\n ',
  series: dummySeriesDetail,
  prev_post: dummyPost,
  next_post: dummyPost,
  comments: [],
  is_active: true,
  create_tag: '',
};

const dummyTempPosts: postDetail[] = [
  dummyPostDetail,
  dummyPostDetail,
  dummyPostDetail,
];

function Saves() {
  const { open } = useModalActions();
  const timeNow = moment();
  const timePost = moment(dummyPostDetail.updated_at);

  const onDeleteClick = () => {
    open(
      '임시 글 삭제',
      '임시 저장한 글을 삭제하시겠습니까?\n삭제한 글은 복구할 수 없습니다.'
    );
  };

  return (
    <div className={styles.page_container}>
      <Header />
      <HeaderMoving />
      <div className={cx('page_box', 'hori_size')}>
        <h1>임시 글 목록</h1>
        <div>
          {dummyTempPosts.map(post => {
            return (
              <div className={styles.post_container}>
                <h3>
                  <a href={post.url}>{post.title}</a>
                </h3>
                <p>
                  <a href={post.url}>{post.content}</a>
                </p>
                <section>
                  {moment.duration(timeNow.diff(timePost)).asDays() > 7 ? (
                    <Moment format="YYYY년 MM월 DD일">
                      {dummyPostDetail.updated_at}
                    </Moment>
                  ) : (
                    <Moment fromNow>{dummyPostDetail.updated_at}</Moment>
                  )}
                  <button
                    type="button"
                    className={styles.remove}
                    onClick={onDeleteClick}
                  >
                    삭제
                  </button>
                </section>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Saves;
