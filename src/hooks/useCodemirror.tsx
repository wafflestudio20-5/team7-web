import React, { useState, useEffect, useRef } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { syntaxHighlighting, HighlightStyle } from '@codemirror/language';
import { tags } from '@lezer/highlight';

interface useCodemirrorParamsType {
  initialDoc: string;
  setDoc: React.Dispatch<React.SetStateAction<string>>;
}

const markdownHighlighting = HighlightStyle.define([
  {
    tag: tags.heading1,
    fontSize: '1.6em',
    fontWeight: 'bold',
  },
  {
    tag: tags.heading2,
    fontSize: '1.4em',
    fontWeight: 'bold',
  },
  {
    tag: tags.heading3,
    fontSize: '1.2em',
    fontWeight: 'bold',
  },
]);

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
        markdown({
          base: markdownLanguage, // Support GFM
        }),
        syntaxHighlighting(markdownHighlighting),
        EditorView.lineWrapping,
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

export default useCodemirror;
