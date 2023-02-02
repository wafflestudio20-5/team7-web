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
} from '../../contexts/types';
import { showToast } from '../../components/Toast';
import CommentWrite from './CommentWrite';

type postGetType = {
  pid: number;
  series: number;
  title: string;
  tags: tag[];
  author: string;
  created_at: string;
  updated_at: string;
  content: string;
  like_count: string;
};

let treeData: any;
const cx = classNames.bind(styles);

const dummyUser: user = {
  username: 'id',
  velog_name: 'velog',
  email: 'mail',
  name: 'name',
  profile_image:
    'https://velog.velcdn.com/images/shinhw371/profile/2a470881-5a62-429f-97fb-c449c2dc1911/social_profile.png',
  introduction: 'desc',
  github: 'git',
  twitter: 'twit',
  facebook: 'face',
  homepage: 'home',
  mail: 'mail',
  about: 'about',
};

const dummyPost: post = {
  pid: 1,
  title: 'title',
  author: 'id',
  url: '/userid/posttitle',
  preview: 'preview',
  thumbnail: 'thm',
  tags: [
    {
      name: 'tag',
      postCount: 1,
    },
  ],
  created_at: '2020-02-20 20:20:20',
  updated_at: '2023-01-24 10:20:20',
  comments: 2,
  likes: 77,
  is_private: false,
};

const dummySeriesPost: seriesPost = {
  series_id: 1,
  post: dummyPost,
};

const dummySeriesDetail: seriesDetail = {
  id: 1,
  title: 'series',
  photo: 'photo',
  update: '2023-01-24 10:20:20',
  author: 'id',
  postNum: 2,
  postList: [dummySeriesPost, dummySeriesPost],
};

function PersonalPost() {
  const [post, setPost] = useState<postDetail>({
    pid: 2,
    title: '',
    author: 'id',
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
    get_or_create_series: '',
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
  const { id, postTitle } = useParams();
  const timeNow = moment();
  const timePost = moment(post.updated_at);

  const getPost = useCallback(async () => {
    try {
      const response = await axios.get(`/api/v1/velog/${id}/${postTitle}`);
      const {
        pid,
        title,
        tags,
        author,
        created_at: createdAt,
        updated_at: updatedAt,
        content,
        like_count: likeCount,
      }: postGetType = response.data;

      setPost({
        ...post,
        pid,
        title,
        tags,
        author,
        created_at: createdAt,
        updated_at: updatedAt,
        content,
        likes: parseInt(likeCount, 10),
      });
      setLoad(true);
    } catch (error) {
      showToast({ type: 'error', message: '글이 존재하지 않습니다.' });
      navigate(-1);
    }
  }, [id, postTitle]);

  useEffect(() => {
    getPost();
  }, [getPost]);

  const getComment = useCallback(async () => {
    if (!isLoad) return;

    try {
      const response = await axios.get(`/api/v1/velog/${post.pid}/comment/`);
      setPost({ ...post, comments: response.data });
    } catch (error) {
      console.log(error);
    }
  }, [post.pid]);

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

  const onDeleteClick = () => {
    open('포스트 삭제', '정말로 삭제하시겠습니까?');
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
          <div className={styles.actions}>
            <button type="button">통계</button>
            <button type="button" onClick={onReviseClick}>
              수정
            </button>
            <button type="button" onClick={onDeleteClick}>
              삭제
            </button>
          </div>
          <div className={styles.info_container}>
            <div className={styles.information}>
              <span className={styles.username}>
                <Link to={`/@${dummyUser.username}`}>{dummyUser.username}</Link>
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
          <SeriesSelector />
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
            <Link to={`/@${dummyUser.username}`}>
              <img src={dummyUser.profile_image} alt="profile" />
            </Link>
            <div className={styles.name_desc}>
              <div className={styles.name}>
                <Link to={`/@${dummyUser.username}`}>{dummyUser.username}</Link>
              </div>
              <div className={styles.description}>{dummyUser.introduction}</div>
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
              to={`/@${dummyUser.username}/${post.title}`}
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
              to={`/@${dummyUser.username}/${post.title}`}
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
