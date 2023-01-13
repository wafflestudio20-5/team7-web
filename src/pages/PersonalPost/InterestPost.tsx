import React from 'react';
import PostComp from '../../components/PostComp';
import styles from './InterestPost.module.scss';

function InterestPost() {
  return (
    <div className={styles.background}>
      <div className={styles.title}>관심 있을 만한 포스트</div>
      <div className={styles.container}>
        <div className={styles.post_container}>
          <PostComp />
        </div>
      </div>
    </div>
  );
}

export default InterestPost;
