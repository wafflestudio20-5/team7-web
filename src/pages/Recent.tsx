import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HomeContents from '../components/HomeContents';
import { post } from '../contexts/types';

function Recent() {
  const tempPosts: post[] = [];
  const [posts, setPosts] = useState(tempPosts);

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
    if ((pageNumber === 1 || entry.isIntersecting) && !loading) {
      try {
        observer.unobserve(entry.target);
        setLoading(true);
        const response = await axios.get(
          `/api/v1/velog/recent?page=${pageNumber}`
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
  }, [target]);

  return (
    <>
      <HomeContents posts={posts} />
      <div ref={setTarget} />
    </>
  );
}

export default Recent;
