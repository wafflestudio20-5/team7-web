import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import PostComp from '../../components/PostComp';
import { post, tag } from '../../contexts/types';
import styles from './InterestPost.module.scss';

function InterestPost({ tags, pid }: { tags: tag[]; pid: number }) {
  const [posts, setPosts] = useState<post[]>([]);

  const getInterestPosts = async () => {
    tags.map(async tag => {
      try {
        const response = await axios.get(`/api/v1/velog/tags/${tag.name}`);
        const postList: post[] = response.data;
        postList.map(tempPost => {
          if (tempPost.pid !== pid) {
            setPosts(p => {
              if (p.findIndex(post => post.pid === tempPost.pid) === -1) {
                p.push(tempPost);
              }
              return p;
            });
          }

          return 0;
        });
      } catch (error) {
        return 0;
      }
      return 0;
    });
  };

  useEffect(() => {
    setPosts([]);
  }, [pid]);

  useEffect(() => {
    if (posts.length) return;
    getInterestPosts();
  }, [posts]);

  return (
    <div className={styles.background}>
      <div className={styles.title}>관심 있을 만한 포스트</div>
      <div className={styles.container}>
        <div className={styles.post_container}>
          {posts.map(post => {
            return <PostComp post={post} key={post.pid} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default InterestPost;
