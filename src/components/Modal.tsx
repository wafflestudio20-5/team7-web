import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Modal.module.scss';
import { useModalActions, useModalValue } from '../contexts/ModalProvider';

const cx = classNames.bind(styles);

function Modal() {
  const [closeStart, setCloseStart] = useState(false);
  const { visible, title, message } = useModalValue();
  const { close } = useModalActions();

  useEffect(() => {
    if (!visible) {
      setCloseStart(false);
    }
  }, [visible]);

  const onCloseClick = () => {
    setCloseStart(true);
    setTimeout(() => close(), 400);
  };

  return visible ? (
    <div>
      <div className={cx('background', { close: closeStart })} />
      <div className={styles.modal_container}>
        <div className={cx('modal_box', { close: closeStart })}>
          <div>
            <h3>{title}</h3>
            <div className={styles.message}>{message}</div>
            <div className={styles.button_area}>
              <button
                type="button"
                className={styles.cancel_button}
                onClick={onCloseClick}
              >
                취소
              </button>
              <button type="button" className={styles.comfirm_button}>
                확인
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div />
  );
}

export default Modal;
