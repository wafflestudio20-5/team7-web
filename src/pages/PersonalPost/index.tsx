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
import styles from './PersonalPost.module.scss';
import { ReactComponent as LeftArrowIcon } from '../../assets/left_arrow.svg';
import { ReactComponent as RightArrowIcon } from '../../assets/right_arrow.svg';
import Toc from './Toc';
import UtilBar from './UtilBar';
import Comment from './Comment';
import Modal from '../../components/Modal';
import { useModalActions } from '../../contexts/ModalProvider';
import Header from '../../components/Header';
import HeaderMoving from '../../components/HeaderMoving';
import InterestPost from './InterestPost';
import SeriesSelector from './SeriesSelector';
import { commentListType } from '../../contexts/types';

let treeData: any;
const cx = classNames.bind(styles);

export interface mdElementType {
  key: string;
  rank: number;
  content: string;
}

const dummyUser = {
  id: 'id',
  velog_name: 'velog',
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

function PersonalPost() {
  const [doc] = useState(
    '# title\n ## title2\n ### title3\n\n other title\n ---\n\n content\n '
  );
  const [tocFixed, setTocFixed] = useState(false);
  const [utilFixed, setUtilFixed] = useState(false);
  const [commentList] = useState<commentListType>({
    comments: [
      {
        id: 1,
        writer: dummyUser,
        content: 'first',
        created_at: '2020-02-20 20:20:20',
        updated_at: '2020-02-20 20:20:20',
        children: {
          comments: [
            {
              id: 2,
              writer: dummyUser,
              content: 'second',
              created_at: '2020-02-20 20:20:20',
              updated_at: '2022-02-20 20:20:20',
            },
            {
              id: 3,
              writer: dummyUser,
              content: 'third',
              created_at: '2020-02-20 20:20:20',
              updated_at: '2023-01-17 00:49:20',
              children: {
                comments: [
                  {
                    id: 4,
                    writer: dummyUser,
                    content: 'fourth',
                    created_at: '2020-02-20 20:20:20',
                    updated_at: '2020-02-20 20:20:20',
                  },
                  {
                    id: 5,
                    writer: dummyUser,
                    content: 'fifth',
                    created_at: '2020-02-20 20:20:20',
                    updated_at: '2020-02-20 20:20:20',
                  },
                ],
                length: 2,
              },
            },
          ],
          length: 2,
        },
      },
      {
        id: 6,
        writer: dummyUser,
        content: 'sixth',
        created_at: '2020-02-20 20:20:20',
        updated_at: '2020-02-20 20:20:20',
      },
    ],
    length: 2,
  });
  const tocRef = useRef<HTMLDivElement>(null);
  const utilRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
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

  const onDeleteClick = () => {
    open('포스트 삭제', '정말로 삭제하시겠습니까?');
  };

  return (
    <div className={styles.page_container}>
      <Header />
      <HeaderMoving />
      <div className={cx('head_container', 'hori_size')}>
        <div className={styles.head_wrapper}>
          <h1>title</h1>
          <div className={styles.actions}>
            <button type="button">통계</button>
            <button type="button">수정</button>
            <button type="button" onClick={onDeleteClick}>
              삭제
            </button>
          </div>
          <div className={styles.info_container}>
            <div className={styles.information}>
              <span className={styles.username}>
                <a href="/@username">username</a>
              </span>
              <span className={styles.separator}>·</span>
              <span>1일 전</span>
            </div>
          </div>
          <div className={styles.tag_container}>
            <a href="/tags/mytag">tagname</a>
          </div>
          <div className={styles.util_positioner} ref={utilRef}>
            <div className={styles.util_container}>
              <UtilBar utilFixed={utilFixed} />
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
            <a href="/@username">
              <img
                src="https://velog.velcdn.com/images/shinhw371/profile/2a470881-5a62-429f-97fb-c449c2dc1911/social_profile.png"
                alt="profile"
              />
            </a>
            <div className={styles.name_desc}>
              <div className={styles.name}>
                <a href="/@username">신호원</a>
              </div>
              <div className={styles.description}>description</div>
            </div>
          </div>
          <div className={styles.line} />
          <div className={styles.line_under} />
        </div>
      </div>
      <div className={cx('post_links_container', 'hori_size')}>
        <div className={styles.link_box}>
          <a href="/@username/prev" className={styles.left_link}>
            <div className={styles.arrow_container}>
              <LeftArrowIcon />
            </div>
            <div className={styles.desc_container}>
              <div className={styles.description}>이전 포스트</div>
              <h3>prev post</h3>
            </div>
          </a>
        </div>
        <div className={styles.link_box}>
          <a href="/@username/next" className={styles.right_link}>
            <div className={styles.arrow_container}>
              <RightArrowIcon />
            </div>
            <div className={styles.desc_container}>
              <div className={styles.description}>다음 포스트</div>
              <h3>next post</h3>
            </div>
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
      <Modal />
    </div>
  );
}

export default PersonalPost;
