/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './RegisterForm.module.scss';

const cx = classNames.bind(styles);

export default function RegisterForm() {
  const inputName = useRef<HTMLInputElement>(null);
  const inputEmail = useRef<HTMLInputElement>(null);
  const inputId = useRef<HTMLInputElement>(null);
  const inputPassword1 = useRef<HTMLInputElement>(null);
  const inputPassword2 = useRef<HTMLInputElement>(null);
  const inputDescription = useRef<HTMLInputElement>(null);

  const [done, setDone] = useState(false);

  const postSignUp = async () => {
    try {
      const name = inputName.current?.value;
      const email = inputEmail.current?.value;
      const id = inputId.current?.value;
      const password1 = inputPassword1.current?.value;
      const password2 = inputPassword2.current?.value;
      const description = inputDescription.current?.value;
      const response = await axios.post('/api/v1/accounts/signup/', {
        username: id,
        email,
        password1,
        password2,
        name,
        introduction: description,
      });
      setDone(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {done && (
        <p>
          입력하신 이메일 주소로 인증 메일이 전송되었습니다.
          <br />
          메일에 포함된 인증 링크를 클릭하면 회원가입이 완료됩니다.
          <br />
          <Link to="/login">로그인 페이지로 돌아가기</Link>
        </p>
      )}
      {!done && (
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
              <label htmlFor="password1">비밀번호</label>
              <div className={cx('group')}>
                <div className={cx('wrapper')}>
                  <input
                    type="password"
                    id="password1"
                    placeholder="비밀번호를 입력하세요"
                    ref={inputPassword1}
                  />
                </div>
              </div>
            </section>
            <section>
              <label htmlFor="password2">비밀번호 확인</label>
              <div className={cx('group')}>
                <div className={cx('wrapper')}>
                  <input
                    type="password"
                    id="password2"
                    placeholder="비밀번호를 한번 더 입력하세요"
                    size={25}
                    ref={inputPassword2}
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
                <a href="/login">
                  <button type="button">취소</button>
                </a>
                <button type="button" onClick={postSignUp}>
                  다음
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
