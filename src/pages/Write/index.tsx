/* eslint-disable no-fallthrough */
import React, {
  useState,
  createElement,
  Fragment,
  useRef,
  useEffect,
} from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse/lib';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeReact from 'rehype-react/lib';
import classNames from 'classnames/bind';
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

let treeData: any;
const cx = classNames.bind(styles);

export enum presetBtn {
  h1 = 1,
  h2,
  h3,
  h4,
  bold,
  italic,
  strike,
  blockquote,
  link,
  image,
  codeblock,
}

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
  const [doc, setDoc] = useState('# Hello byome');
  const [isHide, setHide] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [imageLink, setImageLink] = useState<string | null>('');
  const { ref: editorRef, view: editorView } = useCodemirror({
    initialDoc: doc,
    setDoc,
  });
  const previewRef = useRef<HTMLDivElement>(null);
  const mouseIsOn = useRef<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
    .processSync(doc).result;

  const setMouseIsOn = (target: string) => {
    mouseIsOn.current = target;
  };

  const onImageLinkClick = () => {
    fileInputRef.current?.click();
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageLink(e.target.files && e.target.files[0].name);
  };

  useEffect(() => {
    // 원래는 업로드 완료 후 링크 넣기
    if (!editorView) return;
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
    showToast({ type: 'success', message: '포스트가 임시저장되었습니다' });
  };

  const onPublishClick = () => {
    setModalActive(true);
  };

  return (
    <div id={styles.editor_wrapper}>
      <div className={styles.md_container}>
        <div className={cx('md_header', { hide: isHide })}>
          <textarea
            placeholder="제목을 입력하세요"
            className={styles.md_title}
            defaultValue="title"
          />
          <div className={styles.md_title_underline} />
          <div className={styles.md_tag_container}>
            <input placeholder="태그를 입력하세요" className={styles.md_tag} />
            <div className={styles.md_tag_underline} />
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
          <button type="button" className={styles.md_footer_back}>
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
              출간하기
            </button>
          </div>
        </div>
      </div>
      <div className={styles.pv_container}>
        <h1 className={cx('pv_title', { hide: isHide })}>ff</h1>
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
      <PublishModal modalActive={modalActive} setModalActive={setModalActive} />
    </div>
  );
}

export default Write;
