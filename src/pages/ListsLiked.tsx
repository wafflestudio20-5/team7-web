import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import HomeContents from '../components/HomeContents';
import { post } from '../contexts/types';
import { useLoginValue } from '../contexts/LoginProvider';
import { showToast } from '../components/Toast';

function ListsLiked() {
  const tempPosts: post[] = [];
  const [posts, setPosts] = useState(tempPosts);
  const { user } = useLoginValue();
  const navigate = useNavigate();

  const getVelog = async () => {
    try {
      const response = await axios.get('/api/v1/velog/lists/liked');
      setPosts(response.data.results);
    } catch (error) {
      showToast({ type: 'error', message: '잘못된 접근입니다' });
      navigate('/');
    }
  };

  useEffect(() => {
    getVelog();
  }, [user]);

  return <HomeContents posts={posts} />;
}

export default ListsLiked;
