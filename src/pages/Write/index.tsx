/* eslint-disable no-fallthrough */
import React, {
  useState,
  createElement,
  Fragment,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse/lib';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeReact from 'rehype-react/lib';
import classNames from 'classnames/bind';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import useCodemirror from '../../hooks/useCodemirror';
import styles from './Write.module.scss';
import { ReactComponent as BoldIcon } from '../../assets/markdown_bold.svg';
import { ReactComponent as ItalicIcon } from '../../assets/markdown_italic.svg';
import { ReactComponent as StrikeIcon } from '../../assets/markdown_strike.svg';
import { ReactComponent as BlockquoteIcon } from '../../assets/markdown_blockquote.svg';
import { ReactComponent as LinkIcon } from '../../assets/markdown_link.svg';
import { ReactComponent as ImageIcon } from '../../assets/markdown_image.svg';
import { ReactComponent as CodeblockIcon } from '../../assets/markdown_codeblock.svg';
import { ReactComponent as BackIcon } from '../../assets/back.svg';
import { showToast } from '../../components/Toast';
import PublishModal from './PublishModal';
import { postDetail, presetBtn, seriesDetail, tag } from '../../contexts/types';
import { useLoginValue } from '../../contexts/LoginProvider';

type tagGetType = {
  id: number;
  tag_name: string;
  author: string;
  postCount: number;
};

type postGetType = {
  pid: number;
  series: number;
  get_or_create_series: string;
  title: string;
  author: string;
  created_at: string;
  updated_at: string;
  thumbnail: string;
  preview: string;
  content: string;
  is_private: boolean;
  create_tag: string;
  tags: tagGetType[];
  url: string;
};

let treeData: any;
const cx = classNames.bind(styles);

const wrapperToRegExp = (wrapper: string) => {
  switch (wrapper) {
    case '**':
      return '\\*\\*';
    case '_':
      return '_';
    case '~~':
      return '~~';
    case '[':
      return '\\[';
    case ']()':
      return '\\]\\(\\)';
    case '```\n':
      return '```\n';
    case '\n```':
      return '\n```';
    default:
      return '';
  }
};

function Write() {
  const [post, setPost] = useState<postDetail>({
    pid: -1,
    title: '',
    author: 'id',
    url: '',
    preview: '',
    thumbnail: '',
    tags: [],
    created_at: '',
    updated_at: '',
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
  const [isLoad, setLoad] = useState(false);
  const [isHide, setHide] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [imageLink, setImageLink] = useState<string | null>('');
  const [tagDescActive, setTagDescActive] = useState(false);
  const [tagDescVisible, setTagDescVisible] = useState(false);
  const [tagDescDamp, setTagDescDamp] = useState(false);
  const [tagText, setTagText] = useState('');
  const previewRef = useRef<HTMLDivElement>(null);
  const mouseIsOn = useRef<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { ref: editorRef, view: editorView } = useCodemirror({
    initialDoc: post.content,
    setPost,
  });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useLoginValue();
  const pid = searchParams.get('id');

  const getCurPost = useCallback(async () => {
    if (pid === null) return;

    try {
      const response = await axios.get(`/api/v1/velog/write/id=${pid}`);
      const {
        pid: id,
        series,
        title,
        author,
        created_at: createdAt,
        updated_at: updatedAt,
        thumbnail,
        preview,
        content,
        is_private: isPrivate,
        create_tag: createTag,
        tags,
        url,
      }: postGetType = response.data;

      if (!user || user.username !== author) {
        showToast({ type: 'error', message: '권한이 없습니다.' });
        navigate(-1);
      }

      const frontTags = tags.map(tag => {
        const frontTag: tag = {
          name: tag.tag_name,
          postCount: tag.postCount,
        };
        return frontTag;
      });

      // series id 만 필요
      const frontSeries: seriesDetail = {
        id: series,
        series_name: '',
        photo: '',
        update: '',
        author: '',
        postNum: 0,
        postList: [],
      };

      setPost({
        ...post,
        pid: id,
        author,
        title,
        created_at: createdAt,
        updated_at: updatedAt,
        thumbnail,
        preview,
        content,
        series: frontSeries,
        is_private: isPrivate,
        tags: frontTags,
        url,
        create_tag: createTag,
      });
      setLoad(true);
    } catch (error) {
      showToast({ type: 'error', message: '글이 존재하지 않습니다.' });
      navigate(-1);
    }
  }, [pid]);

  useEffect(() => {
    getCurPost();
  }, [getCurPost]);

  // content 갖고 온 후 codemirror에 반영
  useEffect(() => {
    if (editorView) {
      const change = {
        from: 0,
        insert: post.content,
      };
      editorView.dispatch({
        changes: change,
      });
    }
  }, [isLoad]);

  const defaultPlugin = () => (tree: any) => {
    treeData = tree; // treeData length corresponds to previewer's childNodes length
    return tree;
  };

  const markdownElem = editorRef.current;
  const previewElem = previewRef.current;

  const computeElemsOffsetTop = () => {
    if (editorView === null) return undefined;
    if (markdownElem === null || previewElem === null) return undefined;

    const markdownChildNodesOffsetTopList: number[] = [];
    const previewChildNodesOffsetTopList: number[] = [];

    treeData.children.forEach((child: any, index: number) => {
      if (child.type !== 'element' || child.position === undefined) return;

      const pos = child.position.start.offset;
      const lineInfo = editorView.lineBlockAt(pos);
      const offsetTop = lineInfo.top;

      markdownChildNodesOffsetTopList.push(offsetTop);
      previewChildNodesOffsetTopList.push(
        (previewElem.childNodes[index] as HTMLElement).offsetTop -
          previewElem.getBoundingClientRect().top // offsetTop from the top of preview
      );
    });

    return { markdownChildNodesOffsetTopList, previewChildNodesOffsetTopList };
  };

  const handleMdScroll = () => {
    if (mouseIsOn.current !== 'markdown') {
      return;
    }
    if (markdownElem === null || previewElem === null) return;

    const elemsOffsetTop = computeElemsOffsetTop();
    if (elemsOffsetTop === undefined) return;

    const { markdownChildNodesOffsetTopList, previewChildNodesOffsetTopList } =
      elemsOffsetTop;

    let scrollElemIndex: number = -1;
    for (let i = 0; markdownChildNodesOffsetTopList.length > i; i += 1) {
      if (markdownElem.scrollTop < markdownChildNodesOffsetTopList[i]) {
        scrollElemIndex = i - 1;
        break;
      }
    }

    if (
      markdownElem.scrollTop >=
      markdownElem.scrollHeight - markdownElem.clientHeight // true when scroll reached the bottom
    ) {
      previewElem.scrollTop =
        previewElem.scrollHeight - previewElem.clientHeight; // scroll to the bottom
      return;
    }

    if (markdownElem.scrollTop === 0) {
      setHide(false);
    } else {
      setHide(true);
    }

    if (scrollElemIndex >= 0) {
      const ratio =
        (markdownElem.scrollTop -
          markdownChildNodesOffsetTopList[scrollElemIndex]) /
        (markdownChildNodesOffsetTopList[scrollElemIndex + 1] -
          markdownChildNodesOffsetTopList[scrollElemIndex]);
      previewElem.scrollTop =
        ratio *
          (previewChildNodesOffsetTopList[scrollElemIndex + 1] -
            previewChildNodesOffsetTopList[scrollElemIndex]) +
        previewChildNodesOffsetTopList[scrollElemIndex];
    }
  };

  const handlePreviewScroll = () => {
    if (mouseIsOn.current !== 'preview') {
      return;
    }
    if (markdownElem === null || previewElem === null) return;

    const elemsOffsetTop = computeElemsOffsetTop();
    if (elemsOffsetTop === undefined) return;

    const { markdownChildNodesOffsetTopList, previewChildNodesOffsetTopList } =
      elemsOffsetTop;

    let scrollElemIndex: number = -1;
    for (let i = 0; previewChildNodesOffsetTopList.length > i; i += 1) {
      if (previewElem.scrollTop < previewChildNodesOffsetTopList[i]) {
        scrollElemIndex = i - 1;
        break;
      }
    }

    if (previewElem.scrollTop === 0) {
      setHide(false);
    } else {
      setHide(true);
    }

    if (scrollElemIndex >= 0) {
      const ratio =
        (previewElem.scrollTop -
          previewChildNodesOffsetTopList[scrollElemIndex]) /
        (previewChildNodesOffsetTopList[scrollElemIndex + 1] -
          previewChildNodesOffsetTopList[scrollElemIndex]);
      markdownElem.scrollTop =
        ratio *
          (markdownChildNodesOffsetTopList[scrollElemIndex + 1] -
            markdownChildNodesOffsetTopList[scrollElemIndex]) +
        markdownChildNodesOffsetTopList[scrollElemIndex];
    }
  };

  const md: any = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeReact, { createElement, Fragment })
    .use(defaultPlugin)
    .processSync(post.content).result;

  const setMouseIsOn = (target: string) => {
    mouseIsOn.current = target;
  };

  const onTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPost(post => {
      return { ...post, title: e.target.value };
    });
  };

  const onTagFocus = () => {
    setTagDescVisible(true);
    setTimeout(() => setTagDescActive(true), 1);
    setTimeout(() => setTagDescDamp(true), 250);
  };

  const onTagBlur = () => {
    setTagDescActive(false);
    setTagDescDamp(false);
    setTimeout(() => setTagDescVisible(false), 251);
  };

  // 쉼표 입력 시 태그 추가
  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    if (text.match(',$')) {
      const newTag = text.slice(0, -1);

      if (
        newTag.length > 0 &&
        post.tags.find(tag => tag.name === newTag) === undefined
      ) {
        setPost(post => {
          return {
            ...post,
            tags: [...post.tags, { name: newTag, postCount: 0 }],
            create_tag: `${post.create_tag}${newTag}, `,
          };
        });
      }

      e.target.value = '';
    }
    setTagText(e.target.value);
  };

  // 엔터 입력 시 태그 추가
  const onTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const text = target.value;
    if (e.key === 'Enter') {
      if (
        text.length > 0 &&
        post.tags.find(tag => tag.name === text) === undefined
      ) {
        setPost(post => {
          return {
            ...post,
            tags: [...post.tags, { name: text, postCount: 0 }],
            create_tag: `${post.create_tag}${text}, `,
          };
        });
        setTagText('');
      }

      target.value = '';
    } else if (e.key === 'Backspace') {
      const tempTags = post.tags;
      if (tempTags.pop() === undefined) return;

      setPost(post => {
        return {
          ...post,
          tag: [...tempTags],
          created_at: `${tempTags.map(x => x.name).join(', ')}, `,
        };
      });
    }
  };

  const onImageLinkClick = () => {
    fileInputRef.current?.click();
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageLink(e.target.files && e.target.files[0].name);
  };

  useEffect(() => {
    // 원래는 업로드 완료 후 링크 넣기
    if (!editorView || !imageLink) return;
    const cursor = editorView.state.selection.main;

    editorView.dispatch({
      changes: {
        from: cursor.from,
        to: cursor.from + 11,
        insert: `[](${imageLink})`,
      },
      selection: {
        anchor: cursor.from + 4 + (imageLink ? imageLink.length : 0),
      },
    });
  }, [imageLink]);

  const onPresetClick = (preset: presetBtn) => {
    if (!editorView) return;

    const cursor = editorView.state.selection.main;
    const textInfo = editorView.state.doc;
    const lineInfo = textInfo.lineAt(cursor.anchor);
    const textWrapper = ['', ''];
    let innerText = '';

    // 변경할 위치와 내용
    const change = {
      from: cursor.from,
      insert: '',
    };
    // 변경후 커서 위치
    const selection = {
      anchor: cursor.from,
      head: cursor.from,
    };

    switch (preset) {
      case presetBtn.h1:
      case presetBtn.h2:
      case presetBtn.h3:
      case presetBtn.h4: {
        change.insert = `${'#'.repeat(preset)} `;
        change.from = lineInfo.from;
        selection.anchor = lineInfo.to + change.insert.length;
        selection.head = selection.anchor;

        // 이미 heading 이 적용
        const prevHead = lineInfo.text.match('^#+ ');
        if (prevHead) {
          const prevHeadLen = prevHead[0].length;

          editorView.dispatch({
            changes: {
              from: lineInfo.from,
              to: lineInfo.from + prevHeadLen,
            },
          });

          selection.anchor -= prevHeadLen;
          selection.head -= prevHeadLen;
        }
        break;
      }
      case presetBtn.blockquote: {
        change.insert = '> ';
        change.from = lineInfo.from;
        selection.anchor += change.insert.length;
        selection.head = selection.anchor;

        // 이미 적용
        const prevQuote = lineInfo.text.match('^> ');
        if (prevQuote) {
          const prevQuoteLen = prevQuote[0].length;

          editorView.dispatch({
            changes: {
              from: lineInfo.from,
              to: lineInfo.from + prevQuoteLen,
            },
          });

          change.insert = '';
          selection.anchor -= prevQuoteLen;
          selection.head -= prevQuoteLen;
        }
        break;
      }
      case presetBtn.bold:
        if (innerText === '') {
          innerText = '텍스트';
          textWrapper[0] = '**';
          textWrapper[1] = '**';
        }
      case presetBtn.italic:
        if (innerText === '') {
          innerText = '텍스트';
          textWrapper[0] = '_';
          textWrapper[1] = '_';
        }
      case presetBtn.strike:
        if (innerText === '') {
          innerText = '텍스트';
          textWrapper[0] = '~~';
          textWrapper[1] = '~~';
        }
      case presetBtn.link:
        if (innerText === '') {
          innerText = '링크텍스트';
          textWrapper[0] = '[';
          textWrapper[1] = ']()';
        }
      case presetBtn.codeblock: {
        if (innerText === '') {
          innerText = '코드를 입력하세요';
          textWrapper[0] = '```\n';
          textWrapper[1] = '\n```';
        }

        const outerText = [
          textInfo.sliceString(0, cursor.from),
          textInfo.sliceString(cursor.to),
        ];

        if (
          outerText[0].match(`${wrapperToRegExp(textWrapper[0])}$`) &&
          outerText[1].match(`^${wrapperToRegExp(textWrapper[1])}`)
        ) {
          // 이미 적용
          selection.anchor = cursor.from - textWrapper[0].length;
          selection.head = selection.anchor + (cursor.to - cursor.from);

          editorView.dispatch({
            changes: {
              from: cursor.from - textWrapper[0].length,
              to: cursor.to + textWrapper[1].length,
              insert: textInfo.sliceString(cursor.from, cursor.to),
            },
            selection,
          });
        } else if (cursor.from === cursor.to) {
          // 커서 한 지점인 상태
          change.insert = `${textWrapper[0]}${innerText}${textWrapper[1]}`;
          selection.anchor += textWrapper[0].length;
          selection.head = selection.anchor + innerText.length;
        } else {
          // 커서 범위 지정 상태
          change.insert = `${textWrapper[0]}${textInfo.sliceString(
            cursor.from,
            cursor.to
          )}${textWrapper[1]}`;
          selection.anchor += textWrapper[0].length;
          selection.head = selection.anchor + (cursor.to - cursor.from);

          editorView.dispatch({
            changes: {
              from: cursor.from,
              to: cursor.to,
            },
          });
        }

        break;
      }
      case presetBtn.image:
        change.insert = '[업로드 중..]()';
        onImageLinkClick();

        break;
      default:
        break;
    }

    editorView.dispatch({
      changes: change,
      selection,
    });
  };

  const onSaveClick = () => {
    if (post.title && post.content) {
      showToast({ type: 'success', message: '포스트가 임시저장되었습니다.' });
    } else {
      showToast({ type: 'error', message: '제목 또는 내용이 비어있습니다.' });
    }
  };

  const onPublishClick = () => {
    setModalActive(true);
    setPost(post => {
      return {
        ...post,
        preview: post.content.slice(0, 150),
        url: post.title,
      };
    });
  };

  const onExitClick = () => {
    navigate(-1);
  };

  return (
    <div id={styles.editor_wrapper}>
      <div className={styles.md_container}>
        <div className={cx('md_header', { hide: isHide })}>
          <textarea
            placeholder="제목을 입력하세요"
            className={styles.md_title}
            value={post.title}
            onChange={onTitleChange}
          />
          <div className={styles.md_title_underline} />
          <div className={styles.md_tag_container}>
            {post.tags.map(tag => {
              return (
                <div className={styles.md_tag} key={tag.name}>
                  {tag.name}
                </div>
              );
            })}
            <input
              placeholder="태그를 입력하세요"
              className={styles.md_tag_input}
              onFocus={onTagFocus}
              onBlur={onTagBlur}
              onChange={handleTagInput}
              onKeyDown={onTagKeyDown}
              value={tagText}
            />
            <div className={styles.md_tag_underline}>
              {tagDescVisible && (
                <div
                  className={cx(
                    'inside',
                    { active: tagDescActive },
                    { damp: tagDescDamp }
                  )}
                >
                  쉼표 혹은 엔터를 입력하여 태그를 등록 할 수 있습니다.
                  <br />
                  등록된 태그를 클릭하면 삭제됩니다.
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={cx('md_toolbar', { hide: isHide })}>
          {[1, 2, 3, 4].map(val => {
            return (
              <button
                type="button"
                value={val}
                key={val}
                onClick={() => onPresetClick(val)}
              >
                <div>
                  H<span>{val}</span>
                </div>
              </button>
            );
          })}
          <div className={styles.md_toolbar_partition} />
          <button type="button" onClick={() => onPresetClick(presetBtn.bold)}>
            <BoldIcon />
          </button>
          <button type="button" onClick={() => onPresetClick(presetBtn.italic)}>
            <ItalicIcon />
          </button>
          <button type="button" onClick={() => onPresetClick(presetBtn.strike)}>
            <StrikeIcon />
          </button>
          <div className={styles.md_toolbar_partition} />
          <button
            type="button"
            onClick={() => onPresetClick(presetBtn.blockquote)}
          >
            <BlockquoteIcon />
          </button>
          <button type="button" onClick={() => onPresetClick(presetBtn.link)}>
            <LinkIcon />
          </button>
          <button type="button" onClick={() => onPresetClick(presetBtn.image)}>
            <ImageIcon />
          </button>
          <button
            type="button"
            onClick={() => onPresetClick(presetBtn.codeblock)}
          >
            <CodeblockIcon />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={onFileInputChange}
            style={{ display: 'none' }}
          />
        </div>
        <div
          id={styles.markdown}
          ref={editorRef}
          onScroll={handleMdScroll}
          onMouseEnter={() => setMouseIsOn('markdown')}
        />
        <div className={styles.md_footer}>
          <button
            type="button"
            className={styles.md_footer_back}
            onClick={onExitClick}
          >
            <BackIcon />
            <span>나가기</span>
          </button>
          <div className={styles.md_footer_right}>
            <button
              type="button"
              className={styles.md_footer_save}
              onClick={onSaveClick}
            >
              임시저장
            </button>
            <button
              type="button"
              className={styles.md_footer_publish}
              onClick={onPublishClick}
            >
              {pid === null ? '출간하기' : '수정하기'}
            </button>
          </div>
        </div>
      </div>
      <div className={styles.pv_container}>
        <h1 className={cx('pv_title', { hide: isHide })}>{post.title}</h1>
        <div
          id={styles.preview}
          ref={previewRef}
          onScroll={handlePreviewScroll}
          onMouseEnter={() => setMouseIsOn('preview')}
        >
          {md}
          <div className={styles.pv_footer} />
        </div>
      </div>
      <PublishModal
        post={post}
        setPost={setPost}
        modalActive={modalActive}
        setModalActive={setModalActive}
        tagText={tagText}
      />
    </div>
  );
}

export default Write;
