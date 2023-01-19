import React, { useEffect, useState } from 'react';
import { commentListType } from '../../contexts/types';
import CommentItem from './CommentItem';
import styles from './Comment.module.scss';
import { ReactComponent as LeftMarkIcon } from '../../assets/left_mark.svg';
import { ReactComponent as RightMarkIcon } from '../../assets/right_mark.svg';

const commentPerPage = 10;

interface commentProps {
  commentList: commentListType;
  rank: number;
}

function Comment({ commentList, rank }: commentProps) {
  const [page, setPage] = useState(1);
  const [range, setRange] = useState([page - 2, page + 2]);
  const numPages = Math.ceil(commentList.length / commentPerPage);
  const offset = (page - 1) * commentPerPage;

  useEffect(() => {
    if (numPages <= 5) {
      setRange([1, numPages]);
    } else if (page < 3) {
      setRange([1, 5]);
    } else if (page > numPages - 2) {
      setRange([numPages - 4, numPages]);
    } else {
      setRange([page - 2, page + 2]);
    }
  }, [page]);

  const onPageClick = (n: number) => {
    setPage(n);
  };

  const onLLClick = () => {
    setPage(1);
  };

  const onLeftClick = () => {
    if (page > 1) {
      setPage(x => x - 1);
    }
  };

  const onRRClick = () => {
    setPage(numPages);
  };

  const onRightClick = () => {
    if (page < numPages) {
      setPage(x => x + 1);
    }
  };

  return (
    <div>
      {commentList.comments
        .slice(offset, offset + commentPerPage)
        .map(comment => {
          return (
            // 키는 임시로 설정
            <CommentItem key={comment.id} comment={comment} rank={rank} />
          );
        })}
      <div className={styles.pagenation}>
        <button type="button" onClick={onLLClick}>
          <LeftMarkIcon />
          <LeftMarkIcon />
        </button>
        <button type="button" onClick={onLeftClick}>
          <LeftMarkIcon />
        </button>
        {Array(numPages)
          .fill(1)
          .map((x, y) => x + y)
          .slice(range[0] - 1, range[1])
          .map(n => (
            <button type="button" key={n} onClick={() => onPageClick(n)}>
              {n}
            </button>
          ))}
        <button type="button" onClick={onRightClick}>
          <RightMarkIcon />
        </button>
        <button type="button" onClick={onRRClick}>
          <RightMarkIcon />
          <RightMarkIcon />
        </button>
      </div>
    </div>
  );
}

export default Comment;
