import React from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line import/extensions,import/no-unresolved
import classNames from 'classnames/bind';
// eslint-disable-next-line import/extensions,import/no-unresolved
import styles from './BigPostComp.module.scss';
// eslint-disable-next-line import/extensions,import/no-unresolved
import { post } from '../contexts/types';

const cx = classNames.bind(styles);

type post_type = {
  postInfo: post;
  username: string;
};

function BigPostComp({ postInfo, username }: post_type) {
  return (
    <div className={cx('postDiv')}>
      {username === '' && (
        <div className={cx('userInfo')}>
          <Link to={`/@${postInfo.author.id}`}>
            <img src={postInfo.author.userImg} alt="thumbnail" />
          </Link>
          <div className={cx('username')}>
            <Link to={`/@${postInfo.author.id}`}>{postInfo.author.id}</Link>
          </div>
        </div>
      )}
      <Link to={`/@${postInfo.author.id}/${postInfo.title}`}>
        <div className={cx('thumbnail')}>
          <img src={postInfo.thumbnail} alt="post-thumbnail" />
        </div>
      </Link>
      <Link to={`/@${postInfo.author.id}/${postInfo.title}`}>
        <h2>{postInfo.title}</h2>
      </Link>
      <p>{postInfo.preview}</p>
      <div className={cx('tagWrapper')}>
        {postInfo.tags.map((tag: string) => (
          <Link to={`/tags/${tag}`} className={cx('tag')}>
            {tag}
          </Link>
        ))}
      </div>
      <div className={cx('subInfo')}>
        <span>{postInfo.created_at}</span>
        <span className={cx('dot')}>·</span>
        <span>{postInfo.comments}개의 댓글</span>
        <span className={cx('dot')}>·</span>
        <span className={cx('likes')}>
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z"
            />
            {postInfo.likes}
          </svg>
        </span>
        {postInfo.is_private && <span className={cx('dot')}>·</span>}
        {postInfo.is_private && (
          <span>
            <div className={cx('secret')}>
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M17.625 9H16.5V6.81c0-2.47-1.969-4.522-4.44-4.56a4.514 4.514 0 0 0-4.56 4.5V9H6.375A1.88 1.88 0 0 0 4.5 10.875v9a1.88 1.88 0 0 0 1.875 1.875h11.25a1.88 1.88 0 0 0 1.875-1.875v-9A1.88 1.88 0 0 0 17.625 9zm-4.969 5.85v3.225a.672.672 0 0 1-.623.675.657.657 0 0 1-.69-.656V14.85a1.5 1.5 0 0 1-.838-1.486 1.5 1.5 0 1 1 2.152 1.486zM15.187 9H8.814V6.75c0-.848.332-1.645.937-2.25A3.16 3.16 0 0 1 12 3.562a3.16 3.16 0 0 1 2.25.938 3.16 3.16 0 0 1 .938 2.25V9z"
                />
              </svg>{' '}
              비공개
            </div>
          </span>
        )}
      </div>
    </div>
  );
}

export default BigPostComp;
