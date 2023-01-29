import axios from 'axios';
import React, { useState } from 'react';
import { showToast } from '../../components/Toast';
import styles from './CommentWrite.module.scss';

interface CommentWriteProps {
  text: string;
  pid: number;
  setCommentLoadTrig: React.Dispatch<React.SetStateAction<boolean>>;
  initialContent: string;
  parent: number | null;
  toggle: (() => void) | undefined;
  cid: number | undefined;
}

// 댓글 작성 창
export default function CommentWrite({
  text,
  pid,
  setCommentLoadTrig,
  initialContent,
  parent = null,
  toggle = undefined,
  cid = undefined,
}: CommentWriteProps) {
  const [content, setContent] = useState(initialContent);

  const publishComment = async () => {
    try {
      const data = {
        content,
        parent_comment: parent,
      };
      const response =
        cid === undefined
          ? await axios.post(`/api/v1/velog/${pid}/comment/`, data)
          : await axios.put(`/api/v1/velog/${pid}/comment/${cid}`, data);

      setCommentLoadTrig(true);
      setContent('');
      if (cid !== undefined && toggle) toggle();
    } catch (error) {
      showToast({ type: 'error', message: '다시 시도 해주세요.' });
      console.log(error);
    }
  };

  const onCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 200) {
      e.target.value = e.target.value.slice(0, 200);
    }

    setContent(e.target.value);
  };

  return (
    <div>
      <textarea
        placeholder="댓글을 작성하세요"
        className={styles.comment_write}
        value={content}
        onChange={onCommentChange}
      />
      <div className={styles.write_buttons_wrapper}>
        {parent && (
          <button
            type="button"
            className={styles.cancel_button}
            onClick={toggle}
          >
            취소
          </button>
        )}
        <button
          type="button"
          className={styles.ok_button}
          onClick={publishComment}
        >
          {text}
        </button>
      </div>
    </div>
  );
}
