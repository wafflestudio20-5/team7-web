import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Toc.module.scss';

const cx = classNames.bind(styles);
let divKey: number = 0;

interface tocProps {
  content: string;
  tocFixed: boolean;
}

function Toc({ content, tocFixed }: tocProps) {
  const [activeId, setActiveId] = useState('');

  // 게시물 본문을 줄바꿈 기준으로 나누고, 제목 요소인 것만 저장
  const titles = content.split(`\n`).filter(t => t.includes('# '));

  const result = titles.map(item => {
    // #의 갯수에 따라 제목의 크기가 달라지므로 갯수를 센다.
    let count = item.match(/#/g)?.length;
    if (count) {
      // 갯수에 따라 목차에 그릴때 들여쓰기 하기위해 *12을 함.
      count *= 12;
    }

    // 제목의 내용물만 꺼내기 위해 '# '을 기준으로 나누고, 백틱과 공백을 없애주고 count와 묶어서 리턴
    return { title: item.split('# ')[1].replace(/`/g, '').trim(), count };
  });

  return (
    <div
      className={styles.toc_box}
      style={tocFixed ? { position: 'fixed', top: '112px' } : {}}
    >
      {result.map(item => {
        divKey += 1;
        if (!item?.count) {
          return <div key={divKey} />;
        }

        return (
          <div
            className={cx('toc_element', 'deactive')}
            style={{ marginLeft: `${item.count}px` }}
            key={divKey}
          >
            {item.title}
          </div>
        );
      })}
    </div>
  );
}

export default Toc;
