import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import HomeContents from '../components/HomeContents';
import { post } from '../contexts/types';
import { useLoginValue } from '../contexts/LoginProvider';

function ListsRead() {
  const navigate = useNavigate();

  const tempPosts: post[] = [];
  const [posts, setPosts] = useState(tempPosts);
  const { user } = useLoginValue();

  const [target, setTarget] = useState<HTMLElement | null>(null);
  let pageNumber: number = 1;

  const [loading, setLoading] = useState(false);

  async function getVelog(
    [entry]: IntersectionObserverEntry[],
    observer: {
      unobserve: (arg0: Element) => void;
      observe: (arg0: Element) => void;
    }
  ) {
    if ((pageNumber === 1 || entry.isIntersecting) && !loading && user) {
      try {
        observer.unobserve(entry.target);
        setLoading(true);
        const response = await axios.get(
          `/api/v1/velog/lists/read?page=${pageNumber}`
        );
        setPosts(posts => posts.concat(response.data.results));
        pageNumber += 1;
        setLoading(false);
        observer.observe(entry.target);
      } catch (error: Error | any) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    let observer: IntersectionObserver;
    if (target) {
      observer = new IntersectionObserver(getVelog, {
        threshold: 0.5,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target, user]);

  return (
    <>
      <HomeContents posts={posts} />
      <div ref={setTarget} />
    </>
  );
}

export default ListsRead;
