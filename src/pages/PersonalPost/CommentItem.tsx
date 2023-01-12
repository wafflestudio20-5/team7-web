import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Comment.module.scss';
import { ReactComponent as PlusIcon } from '../../assets/plus_box.svg';
import { ReactComponent as MinusIcon } from '../../assets/minus_box.svg';
import { commentType } from '.';
import Comment from './Comment';
import { useModalActions } from '../../contexts/ModalProvider';

const cx = classNames.bind(styles);

interface commentProps {
  comment: commentType;
  rank: number;
}

// nested ternery 회피용
const buttonText = (visible: boolean, comment: commentType) => {
  if (visible) {
    return <span>숨기기</span>;
  }
  if (comment.children) {
    return <span>{comment.children.length}개의 답글</span>;
  }
  return <span>답글 달기</span>;
};

// 댓글 작성 창
function ReplyWriteDiv({ text, toggle }: { text: string; toggle: () => void }) {
  return (
    <div>
      <textarea
        placeholder="댓글을 작성하세요"
        className={styles.comment_write}
      />
      <div className={styles.write_buttons_wrapper}>
        <button type="button" className={styles.cancel_button} onClick={toggle}>
          취소
        </button>
        <button type="button" className={styles.ok_button}>
          {text}
        </button>
      </div>
    </div>
  );
}

function CommentItem({ comment, rank }: commentProps) {
  const [replyVisible, setReplyVisible] = useState(false);
  const [replyWrite, setReplyWrite] = useState(false);
  const [replyRevise, setReplyRevise] = useState(false);
  const { open } = useModalActions();

  const toggleReply = () => {
    setReplyVisible(x => !x);

    if (comment.children === undefined) {
      setReplyWrite(true);
    }
  };

  const toggleReplyWrite = () => {
    setReplyWrite(x => !x);

    if (comment.children === undefined) {
      setReplyVisible(false);
    }
  };

  const toggleReplyRevise = () => {
    setReplyRevise(x => !x);
  };

  const onDeleteClick = () => {
    open('댓글 삭제', '댓글을 정말로 삭제하시겠습니까?');
  };

  return (
    <div className={styles.comment}>
      <div className={styles.comment_head}>
        <div className={styles.profile}>
          <a href="/@username">
            <img
              src="https://velog.velcdn.com/images/shinhw371/profile/2a470881-5a62-429f-97fb-c449c2dc1911/social_profile.png"
              alt="profile"
            />
          </a>
          <div className={styles.comment_info}>
            <div className={styles.username}>
              <a href="/@username">username</a>
            </div>
            <div className={styles.date}>약 1시간 전</div>
          </div>
        </div>
        <div className={styles.actions}>
          {replyRevise || (
            <span onClick={toggleReplyRevise} role="presentation">
              수정
            </span>
          )}
          <span onClick={onDeleteClick} role="presentation">
            삭제
          </span>
        </div>
      </div>
      {replyRevise ? (
        <ReplyWriteDiv text="댓글 수정" toggle={toggleReplyRevise} />
      ) : (
        <div className={styles.comment_text}>
          <div>
            <div>
              <div>
                <p>{comment.content}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={styles.comment_footer}>
        {rank < 2 && (
          <div
            className={styles.buttons_wrapper}
            onClick={toggleReply}
            role="presentation"
          >
            {replyVisible ? <MinusIcon /> : <PlusIcon />}
            {buttonText(replyVisible, comment)}
          </div>
        )}
        {replyVisible && (
          <div className={styles.reply_container}>
            {comment.children && (
              <Comment commentList={comment.children} rank={rank + 1} />
            )}
            {comment.children && <div className={styles.divider} />}
            {replyWrite ? (
              <ReplyWriteDiv text="댓글 작성" toggle={toggleReplyWrite} />
            ) : (
              <button
                type="button"
                className={styles.reply_write_button}
                onClick={toggleReplyWrite}
              >
                답글 작성하기
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentItem;
