import React, { useState, createElement, Fragment, useRef } from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse/lib';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeReact from 'rehype-react/lib';
import useCodemirror from '../hooks/useCodemirror';
import styles from './Write.module.scss';

let treeData: any;

function Write() {
  const [doc, setDoc] = useState('# Hello byome');
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
      <div
        id={styles.markdown}
        ref={editorRef}
        onScroll={handleMdScroll}
        onMouseEnter={() => setMouseIsOn('markdown')}
      />
      <div
        id={styles.preview}
        ref={previewRef}
        onScroll={handlePreviewScroll}
        onMouseEnter={() => setMouseIsOn('preview')}
      >
        {md}
      </div>
    </div>
  );
}

export default Write;
