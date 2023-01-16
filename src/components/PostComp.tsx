import React from 'react';
import classNames from 'classnames/bind';
import styles from './PostComp.module.scss';
import { post } from '../contexts/types';

const cx = classNames.bind(styles);

type postCompProps = {
  post: post;
};

export default function PostComp({ post }: postCompProps) {
  return (
    <div className={cx('post')}>
      <a className={cx('image-link')} href={post.url}>
        <div className={cx('image-container')}>
          <img src={post.thumbnail} alt="post" />
        </div>
      </a>
      <div className={cx('body')}>
        <a className={cx('content')} href={post.url}>
          <h4>{post.title}</h4>
          <div>
            <p>{post.preview}</p>
          </div>
        </a>
        <div className={cx('sub-info')}>
          <span>{post.created_at}</span>
          <span> · </span>
          <span>{post.comments}개의 댓글</span>
        </div>
      </div>
      <div className={cx('footer')}>
        <a href={'@'.concat(post.author.id)}>
          <img
            className={cx('profile')}
            src={post.author.userImg}
            alt="profile"
          />
          by
          <span>{post.author.id}</span>
        </a>
        <div className={cx('likes')}>{'♥ '.concat(String(post.likes))}</div>
      </div>
    </div>
  );
}
