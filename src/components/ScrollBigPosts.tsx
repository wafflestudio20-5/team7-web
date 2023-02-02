import React from 'react';
import BigPostComp from './BigPostComp';
import { post } from '../contexts/types';

type postList = {
  posts: post[];
};

function ScrollBigPosts({ posts }: postList) {
  return (
    <div>
      {posts.map(post => (
        <BigPostComp key={post.pid} postInfo={post} username="" />
      ))}
    </div>
  );
}

export default ScrollBigPosts;
