import React, { useState, useEffect, useRef } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { syntaxHighlighting, HighlightStyle } from '@codemirror/language';
import { tags } from '@lezer/highlight';
import { postDetail } from '../contexts/types';

interface useCodemirrorParamsType {
  initialDoc: string;
  setPost: React.Dispatch<React.SetStateAction<postDetail>>;
}

const markdownHighlighting = HighlightStyle.define([
  {
    tag: tags.heading,
    lineHeight: '1.5',
    color: 'var(--text1)',
  },
  {
    tag: tags.heading1,
    fontSize: '2.5rem',
    fontWeight: 'bold',
  },
  {
    tag: tags.heading2,
    fontSize: '2rem',
    fontWeight: 'bold',
  },
  {
    tag: tags.heading3,
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  {
    tag: tags.heading4,
    fontSize: '1.3125rem',
    fontWeight: 'bold',
  },
  {
    tag: tags.heading5,
    fontSize: '1.3125rem',
    fontWeight: 'bold',
  },
  {
    tag: tags.heading6,
    fontSize: '1.3125rem',
    fontWeight: 'bold',
  },
  {
    tag: tags.strong,
    fontWeight: 'bold',
  },
  {
    tag: tags.emphasis,
    fontStyle: 'italic',
  },
  {
    tag: tags.quote,
    color: '#9d9d9f',
    fontStyle: 'italic',
  },
  {
    tag: tags.monospace,
    color: '#9d9d9f',
    fontStyle: 'italic',
  },
  {
    tag: tags.link,
    color: '#50a14f',
    borderBottom: '1px solid #50a14f',
  },
]);

function useCodemirror({ initialDoc, setPost }: useCodemirrorParamsType) {
  const ref = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<EditorView | null>(null);

  // restrict double rendering in localhost
  let refCount = 0;
  useEffect(() => {
    if (!ref.current) return;
    if (refCount > 0) return;

    const startState = EditorState.create({
      doc: initialDoc,
      extensions: [
        markdown({
          base: markdownLanguage, // Support GFM
        }),
        syntaxHighlighting(markdownHighlighting),
        EditorView.lineWrapping,
        EditorView.updateListener.of(update => {
          if (update.docChanged) {
            setPost(post => {
              return { ...post, content: update.state.doc.toString() };
            });
          }
        }),
        EditorView.baseTheme({
          '.cm-content': {
            fontFamily: "'Fira Mono', monospace",
            padding: '4px 0px 3rem',
            fontSize: '1.125rem',
            lineHeight: '1.5',
          },
          '.cm-line': { padding: '0 3rem' },
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

export default useCodemirror;
