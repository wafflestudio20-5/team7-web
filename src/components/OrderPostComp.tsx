import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import moment from 'moment/moment';
import styles from '../pages/PersonalSeriesName.module.scss';
import { post } from '../contexts/types';

const cx = classNames.bind(styles);

type post_type = {
  series_order: number | null;
  post: post;
};

// eslint-disable-next-line camelcase
function OrderPostComp({ series_order, post }: post_type) {
  const timeNow = moment();
  const timePost = moment(post.created_at);

  const [agoFormat, setAgoFormat] = useState('YYYY-MM-DD');
  const timeDiff = timeNow.diff(timePost);

  useEffect(() => {
    if (timeDiff < 1000 * 60 * 60)
      setAgoFormat(`${Math.floor(timeDiff / (1000 * 60))}분 전`);
    else if (timeDiff < 1000 * 60 * 60 * 24)
      setAgoFormat(`${Math.floor(timeDiff / (1000 * 60 * 60))}시간 전`);
    else if (timeDiff < 1000 * 60 * 60 * 24 * 7)
      setAgoFormat(`${Math.floor(timeDiff / (1000 * 60 * 60 * 24))}일 전`);
    else setAgoFormat(timePost.format('YYYY년 MM월 DD일'));
  }, []);

  return (
    <div className={cx('postDiv')}>
      <h2>
        {/* eslint-disable-next-line camelcase */}
        <span>{series_order}.</span>
        <Link to={`/@${post.author}/${post.url}`}>{post.title}</Link>
      </h2>
      <section>
        <Link to={`/@${post.author}/${post.url}`}>
          <img src={post.thumbnail} alt="post-thumbnail" />
        </Link>
        <div className={cx('postInfo')}>
          <p>{post.preview}</p>
          <div className={cx('date')}>{agoFormat}</div>
        </div>
      </section>
    </div>
  );
}

export default OrderPostComp;
