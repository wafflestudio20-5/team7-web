import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-scroll';
import styles from './Toc.module.scss';
import { mdElementType } from '.';
import useTitleObserver from '../Write/useTitleObserver';

const cx = classNames.bind(styles);

interface tocProps {
  md: mdElementType[];
  textRef: React.RefObject<HTMLDivElement>;
  tocFixed: boolean;
  doc: string;
}

function Toc({ md, textRef, tocFixed, doc }: tocProps) {
  const [activeId, setActiveId] = useState('');
  useTitleObserver(setActiveId, textRef, doc, md);

  // 처음부터 첫 타이틀 활성화되는 것 방지
  useEffect(() => {
    setActiveId('');
  }, [tocFixed]);

  return (
    <div
      className={styles.toc_box}
      style={tocFixed ? { position: 'fixed', top: '112px' } : {}}
    >
      {md.map(elem => {
        const { key, rank, content }: mdElementType = elem;
        return (
          <div
            className={cx(
              'toc_element',
              activeId === key ? 'active' : 'deactive'
            )}
            style={{ marginLeft: `${(rank - 1) * 12}px` }}
            key={key}
          >
            <Link to={key}>{content}</Link>
          </div>
        );
      })}
    </div>
  );
}

export default Toc;
