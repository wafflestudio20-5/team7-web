import React, {
  useState,
  createElement,
  Fragment,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import classNames from 'classnames/bind';
import { unified } from 'unified';
import remarkParse from 'remark-parse/lib';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeReact from 'rehype-react/lib';
import Moment from 'react-moment';
import { Link, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import styles from './PersonalPost.module.scss';
import { ReactComponent as LeftArrowIcon } from '../../assets/left_arrow.svg';
import { ReactComponent as RightArrowIcon } from '../../assets/right_arrow.svg';
import { ReactComponent as LikeIcon } from '../../assets/like.svg';
import Toc from './Toc';
import UtilBar from './UtilBar';
import Comment from './Comment';
import { useModalActions } from '../../contexts/ModalProvider';
import Header from '../../components/Header';
import HeaderMoving from '../../components/HeaderMoving';
import InterestPost from './InterestPost';
import SeriesSelector from './SeriesSelector';
import {
  post,
  postDetail,
  seriesPost,
  seriesDetail,
  user,
  mdElementType,
  commentType,
  tag,
  series,
} from '../../contexts/types';
import { showToast } from '../../components/Toast';
import CommentWrite from './CommentWrite';
import { useLoginValue } from '../../contexts/LoginProvider';

type tagGetType = {
  id: number;
  tag_name: string;
  author: string;
  postCount: number;
};

type postGetType = {
  pid: number;
  series: seriesDetail;
  title: string;
  tags: tagGetType[];
  author: string;
  url: string;
  created_at: string;
  updated_at: string;
  content: string;
  likes: string;
  is_active: boolean;
};

let treeData: any;
const cx = classNames.bind(styles);

function PersonalPost() {
  const [post, setPost] = useState<postDetail>({
    pid: -1,
    title: '',
    author: '',
    url: '',
    preview: '',
    thumbnail: '',
    tags: [],
    created_at: '2000-02-02 02:02:02',
    updated_at: '2000-02-02 02:02:02',
    content: '',
    series: null,
    prev_post: null,
    next_post: null,
    comments: [],
    likes: 0,
    is_private: false,
    is_active: true,
    create_tag: '',
  });
  const [authorInfo, setAuthorInfo] = useState<user>({
    username: '',
    velog_name: '',
    email: '',
    name: '',
    profile_image: '',
    introduction: '',
    github: '',
    twitter: '',
    facebook: '',
    homepage: '',
    mail: '',
    about: '',
  });
  const [isLoad, setLoad] = useState(false);
  const [commentLoadTrig, setCommentLoadTrig] = useState(false);
  const [tocFixed, setTocFixed] = useState(false);
  const [utilFixed, setUtilFixed] = useState(false);
  const [likeClicked, setLikeClicked] = useState(false);
  const tocRef = useRef<HTMLDivElement>(null);
  const utilRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { open } = useModalActions();
  const { id: atId, postTitle: postUrl } = useParams();
  const { user } = useLoginValue();
  const timeNow = moment();
  const timePost = moment(post.updated_at);

  const getPost = useCallback(async () => {
    if (!atId || !postUrl) return;

    try {
      const response = await axios.get(`/api/v1/velog/${atId}/${postUrl}`);
      const {
        pid,
        series,
        title,
        tags,
        author,
        url,
        created_at: createdAt,
        updated_at: updatedAt,
        content,
        likes,
        is_active: isLikeActive,
      }: postGetType = response.data;

      const frontTags = tags.map(tag => {
        const frontTag: tag = {
          name: tag.tag_name,
          postCount: tag.postCount,
        };
        return frontTag;
      });

      setPost({
        ...post,
        pid,
        title,
        tags: frontTags,
        author,
        url,
        created_at: createdAt,
        updated_at: updatedAt,
        content,
        series,
        likes: parseInt(likes, 10),
        is_active: isLikeActive,
      });
      setLoad(true);
    } catch (error) {
      showToast({ type: 'error', message: '글이 존재하지 않습니다.' });
      navigate(-1);
    }
  }, [atId, postUrl]);

  useEffect(() => {
    getPost();
  }, [getPost]);

  const getAuthor = useCallback(async () => {
    if (!isLoad) return;

    try {
      const response = await axios.get(`/api/v1/accounts/user/@${post.author}`);
      const userInfo: user = response.data;
      setAuthorInfo({ ...userInfo });
    } catch (error) {
      console.log(error);
    }
  }, [isLoad]);

  useEffect(() => {
    getAuthor();
  }, [getAuthor]);

  // const getSeries = useCallback(async () => {
  //   if (!isLoad) return;

  //   try {
  //     const response = await axios.get(`/api/v1/velog/@${post.author}/series/`);
  //     const curSeries: series = response.data.find(
  //       (series: series) => series.id === seriesId
  //     );

  //     if (!curSeries) return;

  //     const postListRes = await axios.get(
  //       `/api/v1/velog/@${post.author}/series/${curSeries.series_name}`
  //     );

  //     const seriesPostList: seriesPost[] = postListRes.data.map(
  //       (post: postGetType) => {
  //         return { series_id: seriesId, post };
  //       }
  //     );

  //     setPost({
  //       ...post,
  //       series: {
  //         ...curSeries,
  //         title: curSeries.series_name,
  //         postList: seriesPostList,
  //       },
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [isLoad]);

  // useEffect(() => {
  //   getSeries();
  // }, [getSeries]);

  const getComment = useCallback(async () => {
    if (!isLoad) return;

    try {
      const response = await axios.get(`/api/v1/velog/${post.pid}/comment/`);
      setPost({ ...post, comments: response.data });
    } catch (error) {
      console.log(error);
    }
  }, [isLoad]);

  useEffect(() => {
    getComment();
    setCommentLoadTrig(false);
  }, [getComment, commentLoadTrig]);

  const defaultPlugin = () => (tree: any) => {
    treeData = tree; // treeData length corresponds to previewer's childNodes length
    return tree;
  };

  const md: any = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeReact, { createElement, Fragment })
    .use(defaultPlugin)
    .processSync(post.content).result;

  const mdElements: mdElementType[] = md.props.children
    ? md.props.children
        .filter((child: any) => {
          // extract h(n) elements
          return child !== '\n' && child.type[0] === 'h';
        })
        .map((child: any) => {
          const mdKey: string = child.key;
          const mdRank: number = parseInt(child.type.slice(1), 10);
          const mdContent: string = child.props.children[0];

          return { key: mdKey, rank: mdRank, content: mdContent };
        })
    : [];

  const findTocUtilPosition = () => {
    const windowPos = window.scrollY;
    const tocPos = tocRef.current?.getBoundingClientRect().top;
    const utilPos = utilRef.current?.getBoundingClientRect().top;

    if (tocPos && utilPos) {
      setTocFixed(windowPos >= tocPos);
      setUtilFixed(windowPos >= utilPos);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', findTocUtilPosition);

    return () => window.removeEventListener('scroll', findTocUtilPosition);
  }, [tocFixed]);

  const onReviseClick = () => {
    navigate(`/write?id=${post.pid}`);
  };

  const deletePost = async () => {
    try {
      const response = await axios.delete(`/api/v1/velog/${atId}/${postUrl}/`);
      navigate(-1);
    } catch (error) {
      showToast({ type: 'error', message: '다시 시도 해주세요.' });
    }
  };

  const onDeleteClick = () => {
    open('포스트 삭제', '정말로 삭제하시겠습니까?', deletePost);
  };

  const onLikeClick = () => {
    setLikeClicked(x => !x);
  };

  return (
    <div className={styles.page_container}>
      <Header />
      <HeaderMoving />
      <div className={cx('head_container', 'hori_size')}>
        <div className={styles.head_wrapper}>
          <h1>{post.title}</h1>
          {user && user.username === authorInfo.username && (
            <div className={styles.actions}>
              <button type="button" onClick={onReviseClick}>
                수정
              </button>
              <button type="button" onClick={onDeleteClick}>
                삭제
              </button>
            </div>
          )}
          <div className={styles.info_container}>
            <div className={styles.information}>
              <span className={styles.username}>
                <Link to={`/@${authorInfo.username}`}>
                  {authorInfo.username}
                </Link>
              </span>
              <span className={styles.separator}>·</span>
              <span>
                {moment.duration(timeNow.diff(timePost)).asDays() > 7 ? (
                  <Moment format="YYYY년 MM월 DD일">{post.updated_at}</Moment>
                ) : (
                  <Moment fromNow>{post.updated_at}</Moment>
                )}
              </span>
            </div>
            <div className={styles.like_container}>
              <button
                type="button"
                className={cx({ active: likeClicked })}
                onClick={onLikeClick}
              >
                <LikeIcon />
                <span>0</span>
              </button>
            </div>
          </div>
          <div className={styles.tag_container}>
            {post.tags.map(tag => {
              return (
                <Link to={`/tags/${tag.name}`} key={tag.name}>
                  {tag.name}
                </Link>
              );
            })}
          </div>
          <div className={styles.util_positioner} ref={utilRef}>
            <div className={styles.util_container}>
              <UtilBar
                utilFixed={utilFixed}
                likes={post.likes}
                likeClicked={likeClicked}
                setLikeClicked={setLikeClicked}
              />
            </div>
          </div>
          <div className={styles.toc_positioner} ref={tocRef}>
            <div className={styles.toc_container}>
              <Toc
                md={mdElements}
                textRef={textRef}
                tocFixed={tocFixed}
                doc={post.content}
              />
            </div>
          </div>
          {post.series && <SeriesSelector post={post} />}
        </div>
      </div>
      <div className={styles.text_container}>
        <div className={styles.text_box}>
          <div ref={textRef}>{md}</div>
        </div>
      </div>
      <div className={cx('name_card_container', 'hori_size')}>
        <div className={styles.name_card_box}>
          <div className={styles.name_card}>
            <Link to={`/@${authorInfo.username}`}>
              <img src={authorInfo.profile_image} alt="profile" />
            </Link>
            <div className={styles.name_desc}>
              <div className={styles.name}>
                <Link to={`/@${authorInfo.username}`}>
                  {authorInfo.username}
                </Link>
              </div>
              <div className={styles.description}>
                {authorInfo.introduction}
              </div>
            </div>
          </div>
          <div className={styles.line} />
          <div className={styles.line_under} />
        </div>
      </div>
      <div className={cx('post_links_container', 'hori_size')}>
        {post.prev_post && (
          <div className={styles.link_box}>
            <Link
              to={`/@${authorInfo.username}/${post.url}`}
              className={styles.left_link}
            >
              <div className={styles.arrow_container}>
                <LeftArrowIcon />
              </div>
              {post.prev_post && (
                <div className={styles.desc_container}>
                  <div className={styles.description}>이전 포스트</div>
                  <h3>{post.prev_post.title}</h3>
                </div>
              )}
            </Link>
          </div>
        )}
        {post.next_post && (
          <div className={styles.link_box}>
            <Link
              to={`/@${authorInfo.username}/${post.url}`}
              className={styles.right_link}
            >
              <div className={styles.arrow_container}>
                <RightArrowIcon />
              </div>
              {post.next_post && (
                <div className={styles.desc_container}>
                  <div className={styles.description}>다음 포스트</div>
                  <h3>{post.next_post.title}</h3>
                </div>
              )}
            </Link>
          </div>
        )}
      </div>
      <div className={cx('comment_container', 'hori_size')}>
        <h4>{post.comments && post.comments.length}개의 댓글</h4>
        <div>
          <CommentWrite
            text="댓글 작성"
            pid={post.pid}
            setCommentLoadTrig={setCommentLoadTrig}
            initialContent=""
            parent={null}
            toggle={undefined}
            cid={undefined}
          />
          <div className={styles.comment_list_container}>
            <Comment
              commentList={post.comments}
              parent={null}
              rank={0}
              setCommentLoadTrig={setCommentLoadTrig}
            />
          </div>
        </div>
      </div>
      <InterestPost />
    </div>
  );
}

export default PersonalPost;
