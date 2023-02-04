import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HomeContents from '../components/HomeContents';
import { post } from '../contexts/types';
import { useDateFilter } from '../contexts/DateProvider';

function Home() {
  const tempPosts: post[] = [];
  const [posts, setPosts] = useState(tempPosts);
  const { dateFilter } = useDateFilter();
  const [filter, setFilter] = useState(dateFilter);

  const [target, setTarget] = useState<HTMLElement | null>(null);
  let pageNumber: number = 1;
  let loading: Boolean = false;

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
        loading = true;
        const url =
          pageNumber === 1
            ? `/api/v1/velog/${dateFilter}`
            : `/api/v1/velog/${dateFilter}/?page=${pageNumber}`;
        const response = await axios.get(url);
        setPosts(posts => posts.concat(response.data.results));
        pageNumber += 1;
        loading = false;
        observer.observe(entry.target);
      } catch (error: Error | any) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    if (dateFilter !== filter) {
      loading = false;
      setFilter(dateFilter);
      setPosts([]);
      pageNumber = 1;
    }
    console.log(loading, pageNumber);
    let observer: IntersectionObserver;
    if (target) {
      observer = new IntersectionObserver(getVelog, {
        threshold: 0.5,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target, dateFilter]);

  return (
    <>
      <HomeContents posts={posts} />
      <div ref={setTarget} />
    </>
  );
}

export default Home;
