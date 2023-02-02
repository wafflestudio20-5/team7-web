import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Moment from 'react-moment';
import classNames from 'classnames/bind';
import styles from './PostComp.module.scss';
import { post, user } from '../contexts/types';

const cx = classNames.bind(styles);

type postCompProps = {
  post: post;
};

export default function PostComp({ post }: postCompProps) {
  const timeNow = moment();
  const timePost = moment(post.updated_at);

  const user: user = {
    username: 'myId',
    velog_name: 'my_velog',
    email: 'mail',
    name: '이름',
    profile_image: '',
    introduction: '내 벨로그',
    github: 'github',
    twitter: 'twitter',
    facebook: 'facebook',
    homepage: 'https://localhost:3000',
    mail: 'myId@snu.ac.kr',
    about: 'about 페이지에 들어갈 설명입니다',
  };

  return (
    <div className={cx('post')}>
      <Link className={cx('image-link')} to={`/@${post.author}/${post.url}`}>
        <div className={cx('image-container')}>
          <img src={post.thumbnail} alt="post" />
        </div>
      </Link>
      <div className={cx('body')}>
        <Link className={cx('content')} to={`/@${post.author}/${post.url}`}>
          <h4>{post.title}</h4>
          <div>
            <p>{post.preview}</p>
          </div>
        </Link>
        <div className={cx('sub-info')}>
          <span>
            {moment.duration(timeNow.diff(timePost)).asDays() > 7 ? (
              <Moment format="YYYY년 MM월 DD일">{post.updated_at}</Moment>
            ) : (
              <Moment fromNow>{post.updated_at}</Moment>
            )}
          </span>
          <span> · </span>
          <span>{post.comments}개의 댓글</span>
        </div>
      </div>
      <div className={cx('footer')}>
        <Link to={'@'.concat(user.username)}>
          <img
            className={cx('profile')}
            src={user.profile_image}
            alt="profile"
          />
          by
          <span>{user.username}</span>
        </Link>
        <div className={cx('likes')}>{'♥ '.concat(String(post.likes))}</div>
      </div>
    </div>
  );
}
