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
import { ReactComponent as SeriesIcon } from '../../assets/series_mark.svg';
import { ReactComponent as UpTriangleIcon } from '../../assets/up_triangle.svg';
import { ReactComponent as DownTriangleIcon } from '../../assets/down_triangle.svg';
import { ReactComponent as LeftIcon } from '../../assets/left_mark.svg';
import { ReactComponent as RightIcon } from '../../assets/right_mark.svg';
import { ReactComponent as PlusIcon } from '../../assets/plus_box.svg';
import { ReactComponent as MinusIcon } from '../../assets/minus_box.svg';
import { ReactComponent as LeftArrowIcon } from '../../assets/left_arrow.svg';
import { ReactComponent as RightArrowIcon } from '../../assets/right_arrow.svg';
import Toc from './Toc';
import UtilBar from './UtilBar';

let treeData: any;
const cx = classNames.bind(styles);

export interface mdElementType {
  key: string;
  rank: number;
  content: string;
}

function PersonalPost() {
  const [doc, setDoc] = useState(
    '# title\n ## title2\n ### title3\n\n other title\n ---\n\n content\n '
  );
  const [tocFixed, setTocFixed] = useState(false);
  const [utilFixed, setUtilFixed] = useState(false);
  const tocRef = useRef<HTMLDivElement>(null);
  const utilRef = useRef<HTMLDivElement>(null);

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
  console.log(mdElements);

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

  return (
    <div className={styles.page_container}>
      <div className={cx('head_container', 'hori_size')}>
        <div className={styles.head_wrapper}>
          <h1>title</h1>
          <div className={styles.actions}>
            <button type="button">통계</button>
            <button type="button">수정</button>
            <button type="button">삭제</button>
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
              <Toc md={mdElements} tocFixed={tocFixed} />
            </div>
          </div>
          <div className={styles.series_container}>
            <h2>
              <a href="/@username/series/seriesname">seriesname</a>
            </h2>
            <SeriesIcon className={styles.series_mark} />
            <div className={styles.list_actions}>
              <div className={styles.see_hide_container}>
                <DownTriangleIcon />
                목록 보기
              </div>
              <div className={styles.series_number_container}>
                <div className={styles.series_number}>1/1</div>
                <div className={styles.button_container}>
                  <button type="button">
                    <LeftIcon />
                  </button>
                  <button type="button">
                    <RightIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.text_container}>
        <div className={styles.text_box}>
          <div>{md}</div>
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
        <h4>3개의 댓글</h4>
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
            <div>
              <div className={styles.comment}>
                <div className={styles.comment_head}>
                  <div className={styles.profile}>
                    <a href="/@username">
                      <img
                        src="https://velog.velcdn.com/images/shinhw371/profile/2a470881-5a62-429f-97fb-c449c2dc1911/social_profile.png"
                        alt="profile"
                      />
                    </a>
                    <div className={styles.comment_info}>
                      <div className={styles.username}>
                        <a href="/@username">username</a>
                      </div>
                      <div className={styles.date}>약 1시간 전</div>
                    </div>
                  </div>
                  <div className={styles.actions}>
                    <span>수정</span>
                    <span>삭제</span>
                  </div>
                </div>
                <div className={styles.comment_text}>
                  <div>
                    <div>
                      <div>
                        <p>good</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.comment_footer}>
                  <div className={styles.buttons_wrapper}>
                    <PlusIcon />
                    <span>1개의 답글</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalPost;
