import React from 'react';
// eslint-disable-next-line import/extensions,import/no-unresolved
import classNames from 'classnames/bind';
// eslint-disable-next-line import/extensions,import/no-unresolved
import styles from './BigPostComp.module.scss';

const cx = classNames.bind(styles);

interface post {
  id: number;
  title: string;
  url: string;
  intro: string;
  thumbnail: string;
  seriesTitle: string;
  seriesId: number;
  tags: string[];
  date: string;
  comments: number;
  authorId: string;
  authorImg: string;
  heart: number;
}

type post_type = {
  postInfo: post;
  username: string;
};

function BigPostComp({ postInfo, username }: post_type) {
  return (
    <div className={cx('postDiv')}>
      {username === '' && (
        <div className={cx('userInfo')}>
          <a href={`/@${postInfo.authorId}`}>
            <img src={postInfo.authorImg} alt="thumbnail" />
          </a>
          <div className={cx('username')}>
            <a href={`/@${postInfo.authorId}`}>{postInfo.authorId}</a>
          </div>
        </div>
      )}
      <a href={`/@${postInfo.authorId}/${postInfo.title}`}>
        <div className={cx('thumbnail')}>
          <img src={postInfo.thumbnail} alt="post-thumbnail" />
        </div>
      </a>
      <a href={`/@${postInfo.authorId}/${postInfo.title}`}>
        <h2>{postInfo.title}</h2>
      </a>
      <p>{postInfo.intro}</p>
      <div className={cx('tagWrapper')}>
        {postInfo.tags.map((tag: string) => (
          <a href={`/tags/${tag}`} className={cx('tag')}>
            {tag}
          </a>
        ))}
      </div>
      <div className={cx('subInfo')}>
        <span>{postInfo.date}</span>
        <span className={cx('dot')}>·</span>
        <span>{postInfo.comments}개의 댓글</span>
        <span className={cx('dot')}>·</span>
        <span className={cx('likes')}>
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z"
            />
            {postInfo.heart}
          </svg>
        </span>
      </div>
    </div>
  );
}

export default BigPostComp;
