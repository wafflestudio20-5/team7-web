import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import 'moment/locale/ko';
import moment from 'moment';
import { Link } from 'react-router-dom';
import styles from './Comment.module.scss';
import { ReactComponent as PlusIcon } from '../../assets/plus_box.svg';
import { ReactComponent as MinusIcon } from '../../assets/minus_box.svg';
import { commentType, user } from '../../contexts/types';
import Comment from './Comment';
import { useModalActions } from '../../contexts/ModalProvider';

interface commentProps {
  comment: commentType;
  rank: number;
  commentList: commentType[];
}

const dummyUser: user = {
  id: 'id',
  velog_name: 'velog',
  email: 'mail',
  username: 'name',
  userImg:
    'https://velog.velcdn.com/images/shinhw371/profile/2a470881-5a62-429f-97fb-c449c2dc1911/social_profile.png',
  description: 'desc',
  github: 'git',
  twitter: 'twit',
  facebook: 'face',
  homepage: 'home',
  mail: 'mail',
};

// nested ternery 회피용
const buttonText = (visible: boolean, children: commentType[]) => {
  if (visible) {
    return <span>숨기기</span>;
  }
  if (children.length > 0) {
    return <span>{children.length}개의 답글</span>;
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

function CommentItem({ comment, rank, commentList }: commentProps) {
  const [children, setChildren] = useState<commentType[]>([]);
  const [replyVisible, setReplyVisible] = useState(false);
  const [replyWrite, setReplyWrite] = useState(false);
  const [replyRevise, setReplyRevise] = useState(false);
  const { open } = useModalActions();
  const timeNow = moment();
  const timeComment = moment(comment.created_at);

  useEffect(() => {
    setChildren(
      commentList.filter(child => child.parent_comment === comment.cid)
    );
  }, [comment]);

  const toggleReply = () => {
    setReplyVisible(x => !x);

    if (children.length <= 0) {
      setReplyWrite(true);
    }
  };

  const toggleReplyWrite = () => {
    setReplyWrite(x => !x);

    if (children.length <= 0) {
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
          <Link to={`/@${dummyUser.id}`}>
            <img src={dummyUser.userImg} alt="profile" />
          </Link>
          <div className={styles.comment_info}>
            <div className={styles.username}>
              <Link to={`/@${dummyUser.id}`}>{dummyUser.username}</Link>
            </div>
            <div className={styles.date}>
              {moment.duration(timeNow.diff(timeComment)).asDays() > 7 ? (
                <Moment format="YYYY년 MM월 DD일">{comment.created_at}</Moment>
              ) : (
                <Moment fromNow>{comment.created_at}</Moment>
              )}
            </div>
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
            {buttonText(replyVisible, children)}
          </div>
        )}
        {replyVisible && (
          <div className={styles.reply_container}>
            {children.length > 0 && <div className={styles.reply_margin_top} />}
            {children.length > 0 && (
              <Comment
                commentList={commentList}
                parent={comment.cid}
                rank={rank + 1}
              />
            )}
            {children.length > 0 && <div className={styles.divider} />}
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
