import React from 'react';
import { commentListType } from '../../contexts/types';
import CommentItem from './CommentItem';

interface commentProps {
  commentList: commentListType;
  rank: number;
}

function Comment({ commentList, rank }: commentProps) {
  return (
    <div>
      {commentList.comments.map(comment => {
        return (
          // 키는 임시로 설정
          <CommentItem key={comment.id} comment={comment} rank={rank} />
        );
      })}
    </div>
  );
}

export default Comment;
