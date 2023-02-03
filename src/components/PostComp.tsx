import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  const timePost = moment(post.created_at);
  const [agoFormat, setAgoFormat] = useState('YYYY-MM-DD');
  const timeDiff = timeNow.diff(timePost);

  const [user, setUser] = useState({
    username: '',
    velog_name: '',
    email: '',
    name: '',
    profile_image: '',
    introduction: '',
    github: '',
    twitter: '',
    facebook: '',
    homepage: '',
    mail: '',
    about: '',
  });

  const getUser = async () => {
    const response = await axios.get(`/api/v1/accounts/user/@${post.author}`);
    setUser(response.data);
  };

  useEffect(() => {
    getUser();
    if (timeDiff < 1000 * 60 * 60)
      setAgoFormat(`${Math.floor(timeDiff / (1000 * 60))}분 전`);
    else if (timeDiff < 1000 * 60 * 60 * 24)
      setAgoFormat(`${Math.floor(timeDiff / (1000 * 60 * 60))}시간 전`);
    else if (timeDiff < 1000 * 60 * 60 * 24 * 7)
      setAgoFormat(`${Math.floor(timeDiff / (1000 * 60 * 60 * 24))}일 전`);
    else setAgoFormat(timePost.format('YYYY년 MM월 DD일'));
  }, []);

  return (
    <div className={cx('post')}>
      {post.thumbnail !== null && post.thumbnail !== '' && (
        <Link className={cx('image-link')} to={`/@${post.author}/${post.url}`}>
          <div className={cx('image-container')}>
            <img src={post.thumbnail} alt="post" />
          </div>
        </Link>
      )}
      <div className={cx('body')}>
        <Link className={cx('content')} to={`/@${post.author}/${post.url}`}>
          <h4>{post.title}</h4>
          <div>
            <p>{post.preview}</p>
          </div>
        </Link>
        <div className={cx('sub-info')}>
          <span>{agoFormat}</span>
          <span> · </span>
          <span>{post.comments}개의 댓글</span>
        </div>
      </div>
      <div className={cx('footer')}>
        <Link to={`@${post.author}`}>
          <img
            className={cx('profile')}
            src={user.profile_image}
            alt="profile"
          />
          by
          <span>{post.author}</span>
        </Link>
        <div className={cx('likes')}>{`♥ ${post.likes}`}</div>
      </div>
    </div>
  );
}
