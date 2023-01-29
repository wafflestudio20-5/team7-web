import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import 'moment/locale/ko';
import moment from 'moment';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './Comment.module.scss';
import { ReactComponent as PlusIcon } from '../../assets/plus_box.svg';
import { ReactComponent as MinusIcon } from '../../assets/minus_box.svg';
import { commentType, user } from '../../contexts/types';
import Comment from './Comment';
import { useModalActions } from '../../contexts/ModalProvider';
import CommentWrite from './CommentWrite';
import { showToast } from '../../components/Toast';

interface commentProps {
  comment: commentType;
  rank: number;
  commentList: commentType[];
  setCommentLoadTrig: React.Dispatch<React.SetStateAction<boolean>>;
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

function CommentItem({
  comment,
  rank,
  commentList,
  setCommentLoadTrig,
}: commentProps) {
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

  const deleteComment = async (pid: number, cid: number) => {
    try {
      const response = await axios.delete(
        `/api/v1/velog/${pid}/comment/${cid}`
      );

      setCommentLoadTrig(true);
    } catch (error) {
      showToast({ type: 'error', message: '다시 시도 해주세요.' });
      console.log(error);
    }
  };

  const onDeleteClick = () => {
    open('댓글 삭제', '댓글을 정말로 삭제하시겠습니까?', () => {
      deleteComment(comment.post, comment.cid);
    });
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
        <CommentWrite
          text="댓글 수정"
          pid={comment.post}
          setCommentLoadTrig={setCommentLoadTrig}
          initialContent={comment.content}
          parent={comment.parent_comment}
          toggle={toggleReplyRevise}
          cid={comment.cid}
        />
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
                setCommentLoadTrig={setCommentLoadTrig}
              />
            )}
            {children.length > 0 && <div className={styles.divider} />}
            {replyWrite ? (
              <CommentWrite
                text="댓글 작성"
                pid={comment.post}
                setCommentLoadTrig={setCommentLoadTrig}
                initialContent=""
                parent={comment.cid}
                toggle={toggleReplyWrite}
                cid={undefined}
              />
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
