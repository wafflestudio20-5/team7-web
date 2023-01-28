import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { commentType } from '../../contexts/types';
import CommentItem from './CommentItem';
import styles from './Comment.module.scss';
import { ReactComponent as LeftMarkIcon } from '../../assets/left_mark.svg';
import { ReactComponent as RightMarkIcon } from '../../assets/right_mark.svg';

const commentPerPage = 10;
const cx = classNames.bind(styles);

interface commentProps {
  commentList: commentType[];
  parent: number | null;
  rank: number;
  setCommentLoadTrig: React.Dispatch<React.SetStateAction<boolean>>;
}

function Comment({
  commentList,
  parent,
  rank,
  setCommentLoadTrig,
}: commentProps) {
  const [curComments, setCurComments] = useState<commentType[]>([]);
  const [page, setPage] = useState(1);
  const [range, setRange] = useState([page - 2, page + 2]);
  const [numPages, setNumPages] = useState(5);
  const [pageArray, setPageArray] = useState([1, 2, 3, 4, 5]);
  const offset = (page - 1) * commentPerPage;

  useEffect(() => {
    setCurComments(
      commentList.filter(comment => comment.parent_comment === parent)
    );
  }, [commentList]);

  useEffect(() => {
    const tempNumPage = Math.ceil(curComments.length / commentPerPage);
    setNumPages(tempNumPage);
    setPageArray(
      Array(tempNumPage)
        .fill(1)
        .map((x, y) => x + y)
    );

    if (page === tempNumPage - 1) {
      setPage(x => x + 1);
    }
  }, [curComments]);

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
      {curComments.slice(offset, offset + commentPerPage).map(comment => {
        return (
          <CommentItem
            key={comment.cid}
            comment={comment}
            rank={rank}
            commentList={commentList}
            setCommentLoadTrig={setCommentLoadTrig}
          />
        );
      })}
      {curComments.length > 0 && (
        <div className={styles.pagenation}>
          <button
            type="button"
            className={styles.end_point}
            onClick={onLLClick}
          >
            <LeftMarkIcon className={styles.left_svg} />
            <LeftMarkIcon className={styles.right_svg} />
          </button>
          <button type="button" className={styles.left} onClick={onLeftClick}>
            <LeftMarkIcon />
          </button>
          {pageArray.slice(range[0] - 1, range[1]).map(n => (
            <button
              type="button"
              className={cx({ current: n === page })}
              key={n}
              onClick={() => onPageClick(n)}
            >
              {n}
            </button>
          ))}
          <button type="button" className={styles.right} onClick={onRightClick}>
            <RightMarkIcon />
          </button>
          <button
            type="button"
            className={styles.end_point}
            onClick={onRRClick}
          >
            <RightMarkIcon className={styles.left_svg} />
            <RightMarkIcon className={styles.right_svg} />
          </button>
        </div>
      )}
    </div>
  );
}

export default Comment;
