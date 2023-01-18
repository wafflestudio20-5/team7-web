/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './RegisterForm.module.scss';

const cx = classNames.bind(styles);

export default function RegisterForm() {
  const inputName = useRef<HTMLInputElement>(null);
  const inputEmail = useRef<HTMLInputElement>(null);
  const inputId = useRef<HTMLInputElement>(null);
  const inputDescription = useRef<HTMLInputElement>(null);

  const onSubmit = async () => {
    const name = inputName.current?.value;
    const email = inputEmail.current?.value;
    const id = inputId.current?.value;
    const description = inputDescription.current?.value;
    console.log(name, email, id, description);
  };

  return (
    <div className={cx('register-form')}>
      <h1>환영합니다!</h1>
      <div>기본 회원 정보를 등록해주세요.</div>
      <div className={cx('contents')}>
        <section>
          <label htmlFor="name">이름</label>
          <div className={cx('group')}>
            <div className={cx('wrapper')}>
              <input
                type="text"
                id="name"
                placeholder="이름을 입력하세요"
                ref={inputName}
              />
            </div>
          </div>
        </section>
        <section>
          <label htmlFor="email">이메일</label>
          <div className={cx('group')}>
            <div className={cx('wrapper')}>
              <input
                type="text"
                id="email"
                placeholder="이메일을 입력하세요"
                ref={inputEmail}
              />
            </div>
          </div>
        </section>
        <section>
          <label htmlFor="id">아이디</label>
          <div className={cx('group')}>
            <div className={cx('wrapper')}>
              <input
                type="text"
                id="id"
                placeholder="아이디를 입력하세요"
                ref={inputId}
              />
            </div>
          </div>
        </section>
        <section>
          <label htmlFor="description">한 줄 소개</label>
          <div className={cx('group')}>
            <div className={cx('wrapper')}>
              <input
                type="text"
                id="description"
                placeholder="당신을 한 줄로 소개해보세요"
                size={25}
                ref={inputDescription}
              />
            </div>
          </div>
        </section>
        <div className={cx('bottom')}>
          <div className={cx('buttons')}>
            <a href="/">
              <button type="button">취소</button>
            </a>
            <button type="button" onClick={onSubmit}>
              다음
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
