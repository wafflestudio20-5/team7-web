import React, { useState, createElement, Fragment } from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse/lib';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeReact from 'rehype-react/lib';

function Write() {
  const [doc, setDoc] = useState('# Hello byome');

  const md: any = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeReact, { createElement, Fragment })
    .processSync(doc).result;

  return (
    <div>
      <div>{doc}</div>
      <div>{md}</div>
    </div>
  );
}

export default Write;
