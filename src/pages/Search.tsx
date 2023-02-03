import React, { useCallback, useEffect, useState } from 'react';
// eslint-disable-next-line import/extensions,import/no-unresolved
import classNames from 'classnames/bind';
// eslint-disable-next-line import/extensions,import/no-unresolved
import { debounce } from 'lodash';
import axios from 'axios';
import styles from './Search.module.scss';
// eslint-disable-next-line import/extensions,import/no-unresolved
import Header from '../components/Header';
// eslint-disable-next-line import/extensions,import/no-unresolved
import BigPostComp from '../components/BigPostComp';
// eslint-disable-next-line import/extensions,import/no-unresolved
import { post } from '../contexts/types';

const cx = classNames.bind(styles);

function Search() {
  const [query, setQuery] = useState('');
  const username = new URLSearchParams(window.location.search).get('username');
  const initialPost: post[] = [];
  const [posts, setPosts] = useState(initialPost);
  const [page, setPage] = useState(1);
  const [postCount, setCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const updatePosts = useCallback(
    debounce(async (str: string) => {
      try {
        if (str === '') {
          setPosts([]);
          setPage(page => page + 1);
          setCount(0);
          setHasMore(false);
        } else if (username === null) {
          const response = await axios.get(`/api/v1/velog/search?q=${str}`);
          setPosts(posts => posts.concat(response.data.results));
          setPage(page => page + 1);
          setCount(response.data.count);
        } else {
          const response = await axios.get(
            `/api/v1/velog/search?q=${str}&username=${username}`
          );
          setPosts(posts => posts.concat(response.data.results));
          setPage(page => page + 1);
          setCount(response.data.count);
        }
      } catch (e) {
        console.error(e);
      }
    }, 500),
    []
  );
  function debounceSearch(str: string) {
    setPage(1);
    setHasMore(true);
    setPosts([]);
    setQuery(str);
    updatePosts(str);
  }

  async function fetchPosts() {
    if (page !== 1) {
      try {
        updatePosts(query);
      } catch (e) {
        console.error(e);
      }
    }
  }

  useEffect(() => {
    if (page > Math.ceil(postCount / 20)) setHasMore(false);
    else setHasMore(true);
  }, [page, postCount]);

  return (
    <div>
      <Header />
      <div className={cx('searchDiv')}>
        <div>
          {username !== null && (
            <div className={cx('author')}>
              {username}님이 작성한 포스트 검색
            </div>
          )}
          <div className={cx('queryInput')}>
            <svg width="17" height="17" viewBox="0 0 17 17">
              <path
                fillRule="evenodd"
                d="M13.66 7.36a6.3 6.3 0 1 1-12.598 0 6.3 6.3 0 0 1 12.598 0zm-1.73 5.772a7.36 7.36 0 1 1 1.201-1.201l3.636 3.635c.31.31.31.815 0 1.126l-.075.075a.796.796 0 0 1-1.126 0l-3.636-3.635z"
                clipRule="evenodd"
                fill="currentColor"
              />
            </svg>
            <input
              placeholder="검색어를 입력하세요"
              value={query}
              onChange={e => {
                debounceSearch(e.target.value);
              }}
            />
          </div>
        </div>
        {query !== '' && (
          // @ts-ignore
          <div className={cx('found')}>
            총 <b>{postCount}개</b>의 포스트를 찾았습니다.
          </div>
        )}
        {query !== '' && (
          <div>
            {posts?.map((postComp: post) => (
              <BigPostComp
                key={postComp.pid}
                postInfo={postComp}
                username={username === null ? '' : username}
              />
            ))}
            {hasMore && (
              <div className={cx('buttonContainer')}>
                <button
                  type="button"
                  className={cx('showMore')}
                  onClick={fetchPosts}
                >
                  <svg
                    stroke="teal"
                    fill="teal"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    data-testid="arrow"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
                  </svg>
                  포스트 더 보기
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
