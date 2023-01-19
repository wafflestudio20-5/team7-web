import React, {
  useState,
  createElement,
  Fragment,
  useRef,
  useEffect,
} from 'react';
import classNames from 'classnames/bind';
import { unified } from 'unified';
import remarkParse from 'remark-parse/lib';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeReact from 'rehype-react/lib';
import Moment from 'react-moment';
import { useNavigate } from 'react-router-dom';
import styles from './PersonalPost.module.scss';
import { ReactComponent as LeftArrowIcon } from '../../assets/left_arrow.svg';
import { ReactComponent as RightArrowIcon } from '../../assets/right_arrow.svg';
import Toc from './Toc';
import UtilBar from './UtilBar';
import Comment from './Comment';
import { useModalActions } from '../../contexts/ModalProvider';
import Header from '../../components/Header';
import HeaderMoving from '../../components/HeaderMoving';
import InterestPost from './InterestPost';
import SeriesSelector from './SeriesSelector';
import {
  commentListType,
  post,
  postDetail,
  seriesPost,
  seriesDetail,
  user,
  mdElementType,
  commentType,
} from '../../contexts/types';

let treeData: any;
const cx = classNames.bind(styles);

const dummyUser: user = {
  id: 'id',
  velog_name: 'velog',
  email: 'mail',
  username: 'name',
  userImg:
    'https://velog.velcdn.com/images/shinhw371/profile/2a470881-5a62-429f-97fb-c449c2dc1911/social_profile.png',
  description: 'desc',
  github: 'git',
  twitter: 'twit',
  facebook: 'face',
  homepage: 'home',
  mail: 'mail',
};

const dummyCommentList: commentListType = {
  comments: [],
  length: 0,
};

let i;
for (i = 1; i < 107; i += 1) {
  const dummyComment: commentType = {
    id: i,
    writer: dummyUser,
    content: i.toString(),
    created_at: '2020-02-20 20:20:20',
    updated_at: '2020-02-20 20:20:20',
    children: {
      comments: [],
      length: 0,
    },
  };

  dummyCommentList.comments.push(dummyComment);
  dummyCommentList.length += 1;
}

for (i = 100; i < 137; i += 1) {
  const dummyComment: commentType = {
    id: i,
    writer: dummyUser,
    content: i.toString(),
    created_at: '2020-02-20 20:20:20',
    updated_at: '2020-02-20 20:20:20',
    children: {
      comments: [],
      length: 0,
    },
  };

  dummyCommentList.comments[1].children?.comments.push(dummyComment);
  if (dummyCommentList.comments[1].children) {
    dummyCommentList.comments[1].children.length += 1;
  }
}

const dummyPost: post = {
  id: 1,
  title: 'title',
  author: dummyUser,
  url: '/userid/posttitle',
  preview: 'preview',
  thumbnail: 'thm',
  tags: ['tag1', 'tag2', 'tag3'],
  created_at: '2020-02-20 20:20:20',
  updated_at: '2020-02-20 20:20:20',
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
  update: '2020-02-20 20:20:20',
  authorId: 'id',
  postNum: 2,
  postList: [dummySeriesPost, dummySeriesPost],
};

const dummyPostDetail: postDetail = {
  ...dummyPost,
  content:
    '# title\n ## title2\n ### title3\n\n other title\n ---\n\n content\n ',
  series: dummySeriesDetail,
  prev_post: dummyPost,
  next_post: dummyPost,
  comments: dummyCommentList,
};

function PersonalPost() {
  const [doc] = useState(dummyPostDetail.content);
  const [tocFixed, setTocFixed] = useState(false);
  const [utilFixed, setUtilFixed] = useState(false);
  const [commentList] = useState<commentListType>(dummyCommentList);
  const tocRef = useRef<HTMLDivElement>(null);
  const utilRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { open } = useModalActions();

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
    .processSync(doc).result;

  const mdElements: mdElementType[] = md.props.children
    .filter((child: any) => {
      // extract h(n) elements
      return child !== '\n' && child.type[0] === 'h';
    })
    .map((child: any) => {
      const mdKey: string = child.key;
      const mdRank: number = parseInt(child.type.slice(1), 10);
      const mdContent: string = child.props.children[0];

      return { key: mdKey, rank: mdRank, content: mdContent };
    });

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
    navigate('/write');
  };

  const onDeleteClick = () => {
    open('포스트 삭제', '정말로 삭제하시겠습니까?');
  };

  return (
    <div className={styles.page_container}>
      <Header />
      <HeaderMoving />
      <div className={cx('head_container', 'hori_size')}>
        <div className={styles.head_wrapper}>
          <h1>{dummyPostDetail.title}</h1>
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
                <a href={`/@${dummyPostDetail.author.username}`}>
                  {dummyPostDetail.author.username}
                </a>
              </span>
              <span className={styles.separator}>·</span>
              <span>
                <Moment format="YYYY년 MM월 DD일">
                  {dummyPostDetail.updated_at}
                </Moment>
              </span>
            </div>
          </div>
          <div className={styles.tag_container}>
            {dummyPostDetail.tags.map(tag => {
              return <a href={`/tags/${tag}`}>{tag}</a>;
            })}
          </div>
          <div className={styles.util_positioner} ref={utilRef}>
            <div className={styles.util_container}>
              <UtilBar utilFixed={utilFixed} likes={dummyPostDetail.likes} />
            </div>
          </div>
          <div className={styles.toc_positioner} ref={tocRef}>
            <div className={styles.toc_container}>
              <Toc
                md={mdElements}
                textRef={textRef}
                tocFixed={tocFixed}
                doc={doc}
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
        <div>
          <div className={styles.name_card}>
            <a href={`/@${dummyPostDetail.author.username}`}>
              <img src={dummyPostDetail.author.userImg} alt="profile" />
            </a>
            <div className={styles.name_desc}>
              <div className={styles.name}>
                <a href={`/@${dummyPostDetail.author.username}`}>
                  {dummyPostDetail.author.username}
                </a>
              </div>
              <div className={styles.description}>
                {dummyPostDetail.author.description}
              </div>
            </div>
          </div>
          <div className={styles.line} />
          <div className={styles.line_under} />
        </div>
      </div>
      <div className={cx('post_links_container', 'hori_size')}>
        <div className={styles.link_box}>
          <a
            href={`/@${dummyUser.id}/${dummyPostDetail.title}`}
            className={styles.left_link}
          >
            <div className={styles.arrow_container}>
              <LeftArrowIcon />
            </div>
            {dummyPostDetail.prev_post && (
              <div className={styles.desc_container}>
                <div className={styles.description}>이전 포스트</div>
                <h3>{dummyPostDetail.prev_post.title}</h3>
              </div>
            )}
          </a>
        </div>
        <div className={styles.link_box}>
          <a
            href={`/@${dummyUser.id}/${dummyPostDetail.title}`}
            className={styles.right_link}
          >
            <div className={styles.arrow_container}>
              <RightArrowIcon />
            </div>
            {dummyPostDetail.next_post && (
              <div className={styles.desc_container}>
                <div className={styles.description}>다음 포스트</div>
                <h3>{dummyPostDetail.next_post.title}</h3>
              </div>
            )}
          </a>
        </div>
      </div>
      <div className={cx('comment_container', 'hori_size')}>
        <h4>{commentList.length}개의 댓글</h4>
        <div>
          <div>
            <textarea
              placeholder="댓글을 작성하세요"
              className={styles.comment_write}
            />
            <div className={styles.buttons_wrapper}>
              <button type="button">댓글 작성</button>
            </div>
          </div>
          <div className={styles.comment_list_container}>
            <Comment commentList={commentList} rank={0} />
          </div>
        </div>
      </div>
      <InterestPost />
    </div>
  );
}

export default PersonalPost;
