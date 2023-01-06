import React, { useState, createElement, Fragment, useRef } from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse/lib';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeReact from 'rehype-react/lib';
import classNames from 'classnames/bind';
import useCodemirror from '../hooks/useCodemirror';
import styles from './Write.module.scss';
import { ReactComponent as BoldIcon } from '../assets/markdown_bold.svg';
import { ReactComponent as ItalicIcon } from '../assets/markdown_italic.svg';
import { ReactComponent as StrikeIcon } from '../assets/markdown_strike.svg';
import { ReactComponent as BlockquoteIcon } from '../assets/markdown_blockquote.svg';
import { ReactComponent as LinkIcon } from '../assets/markdown_link.svg';
import { ReactComponent as ImageIcon } from '../assets/markdown_image.svg';
import { ReactComponent as CodeblockIcon } from '../assets/markdown_codeblock.svg';
import { ReactComponent as BackIcon } from '../assets/back.svg';

let treeData: any;
const cx = classNames.bind(styles);

function Write() {
  const [doc, setDoc] = useState('# Hello byome');
  const [isHide, setHide] = useState(false);
  const { ref: editorRef, view: editorView } = useCodemirror({
    initialDoc: doc,
    setDoc,
  });
  const previewRef = useRef<HTMLDivElement>(null);
  const mouseIsOn = useRef<string | null>(null);

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

  return (
    <div id={styles.editor_wrapper}>
      <div className={styles.md_container}>
        <div className={cx('md_header', { hide: isHide })}>
          <textarea placeholder="제목을 입력하세요" className={styles.md_title}>
            fe
          </textarea>
          <div className={styles.md_title_underline} />
          <div className={styles.md_tag_container}>
            <input placeholder="태그를 입력하세요" className={styles.md_tag} />
            <div className={styles.md_tag_underline} />
          </div>
        </div>
        <div className={cx('md_toolbar', { hide: isHide })}>
          {[1, 2, 3, 4].map(val => {
            return (
              <button type="button" value={val}>
                <div>
                  H<span>{val}</span>
                </div>
              </button>
            );
          })}
          <div className={styles.md_toolbar_partition} />
          <button type="button">
            <BoldIcon />
          </button>
          <button type="button">
            <ItalicIcon />
          </button>
          <button type="button">
            <StrikeIcon />
          </button>
          <div className={styles.md_toolbar_partition} />
          <button type="button">
            <BlockquoteIcon />
          </button>
          <button type="button">
            <LinkIcon />
          </button>
          <button type="button">
            <ImageIcon />
          </button>
          <button type="button">
            <CodeblockIcon />
          </button>
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
            <button type="button" className={styles.md_footer_save}>
              임시 저장
            </button>
            <button type="button" className={styles.md_footer_publish}>
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
        </div>
      </div>
    </div>
  );
}

export default Write;
