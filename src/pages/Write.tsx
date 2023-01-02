import React, {
  useState,
  createElement,
  Fragment,
  useEffect,
  useRef,
} from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse/lib';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeReact from 'rehype-react/lib';
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';

interface useCodemirrorParamsType {
  initialDoc: string;
  setDoc: React.Dispatch<React.SetStateAction<string>>;
}

function useCodemirror({ initialDoc, setDoc }: useCodemirrorParamsType) {
  const ref = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<EditorView | null>(null);

  // restrict double rendering in localhost
  let refCount = 0;
  useEffect(() => {
    if (!ref.current) return;
    if (refCount > 0) return;

    const startState = EditorState.create({
      doc: initialDoc,
      // contentHeight: '100%',
      extensions: [
        EditorView.updateListener.of(update => {
          if (update.docChanged) {
            setDoc(update.state.doc.toString());
          }
        }),
      ],
    });

    const newView = new EditorView({
      state: startState,
      parent: ref.current,
    });

    setView(newView);
    refCount += 1;
  }, [ref]);

  return { ref, view };
}

function Write() {
  const [doc, setDoc] = useState('# Hello byome');
  const { ref: editorRef, view: editorView } = useCodemirror({
    initialDoc: doc,
    setDoc,
  });

  const md: any = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeReact, { createElement, Fragment })
    .processSync(doc).result;

  return (
    <div>
      <div ref={editorRef} />
      <div>{md}</div>
    </div>
  );
}

export default Write;
