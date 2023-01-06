import React from 'react';
import classNames from 'classnames/bind';
import styles from './QuitModal.module.scss';

const cx = classNames.bind(styles);

type QuitModalProps = {
  quitModal: boolean;
  closeQuitModal: () => void;
};

export default function QuitModal({
  quitModal,
  closeQuitModal,
}: QuitModalProps) {
  return (
    <div className={quitModal ? cx('quit-modal') : cx('blind')}>
      <div className={cx('modal')}>
        <h3>회원 탈퇴</h3>
        <div className={cx('message')}>정말 탈퇴하시겠습니까?</div>
        <div className={cx('button-area')}>
          <button type="button" onClick={closeQuitModal}>
            취소
          </button>
          <button type="button">확인</button>
        </div>
      </div>
    </div>
  );
}
