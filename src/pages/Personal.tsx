import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
// eslint-disable-next-line import/extensions,import/no-unresolved
import classNames from 'classnames/bind';
// eslint-disable-next-line import/extensions,import/no-unresolved
import axios from 'axios';
// eslint-disable-next-line import/extensions,import/no-unresolved
import BigPostComp from '../components/BigPostComp';
// eslint-disable-next-line import/extensions,import/no-unresolved
import styles from './Personal.module.scss';
// eslint-disable-next-line import/extensions,import/no-unresolved,camelcase
import { post } from '../contexts/types';

const cx = classNames.bind(styles);

type tagGetType = {
  id: number;
  tag_name: string;
  author: string;
  postCount: number;
};

function Personal() {
  const [query, setQuery] = useState('');
  const tagQuery = new URLSearchParams(window.location.search).get('tag');
  const { id } = useParams();

  const [postList, setPost] = useState([]);
  const [allPosts, setAllCount] = useState(0);
  const getPost = useCallback(async () => {
    try {
      if (tagQuery === null) {
        const response = await axios.get(`/api/v1/velog/${id}`);
        setPost(response.data);
        setAllCount(response.data.length);
      } else {
        const response = await axios.get(
          `/api/v1/velog/${id}/tags/${tagQuery}`
        );
        setPost(response.data);
      }
    } catch (e) {
      console.error(e);
    }
  }, [id]);

  const [userTags, setTags] = useState([]);
  const getTags = useCallback(async () => {
    try {
      const response = await axios.get(`/api/v1/velog/${id}/tags/`);
      setTags(response.data);
    } catch (e) {
      console.error(e);
    }
  }, [id]);

  useEffect(() => {
    getTags();
    getPost();
  }, [id]);

  return (
    <div>
      <div>
        <section className={cx('searchSection')}>
          <div className={cx('box')}>
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
              onChange={e => setQuery(e.target.value)}
            />
          </div>
        </section>
      </div>
      <div className={cx('tagDiv')}>
        <div>
          <div className={cx('tagList')}>
            <div>
              <div className={cx('title')}>태그 목록</div>
              <ul>
                <li
                  className={cx(
                    'tagElem',
                    tagQuery === null ? 'tagActive' : 'none'
                  )}
                >
                  <Link to={`/${id}`}>전체보기</Link>
                  <span>({allPosts})</span>
                </li>
                {userTags?.map((tag: tagGetType) => (
                  <li
                    className={cx(
                      'tagElem',
                      tagQuery === tag.tag_name ? 'tagActive' : 'none'
                    )}
                  >
                    <Link to={`/${id}?tag=${tag.tag_name}`}>
                      {tag.tag_name}
                    </Link>
                    <span>({tag.postCount})</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="postList">
          {postList.map((postComp: post) => (
            <BigPostComp
              key={postComp.pid}
              postInfo={postComp}
              username={id !== undefined ? id.replace('@', '') : ''}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Personal;
