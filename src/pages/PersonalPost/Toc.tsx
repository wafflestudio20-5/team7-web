import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Toc.module.scss';
import { mdElementType } from '.';

const cx = classNames.bind(styles);

interface tocProps {
  md: mdElementType[];
  tocFixed: boolean;
}

function Toc({ md, tocFixed }: tocProps) {
  const [activeId, setActiveId] = useState('');

  return (
    <div
      className={styles.toc_box}
      style={tocFixed ? { position: 'fixed', top: '112px' } : {}}
    >
      {md.map(elem => {
        const { key, rank, content }: mdElementType = elem;
        return (
          <div
            className={cx('toc_element', 'deactive')}
            style={{ marginLeft: `${(rank - 1) * 12}px` }}
            key={key}
          >
            {content}
          </div>
        );
      })}
    </div>
  );
}

export default Toc;
