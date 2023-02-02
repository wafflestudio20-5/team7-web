import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import styles from './LoginModal.module.scss';
import { useLoginSetting } from '../contexts/LoginProvider';

const cx = classNames.bind(styles);

const googleUrl =
  'https://accounts.google.com/o/oauth2/auth?client_id=1057423908982-0e1v495ji7p6sh0mdbds1nq0h6s3vn5b.apps.googleusercontent.com&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&redirect_uri=https://7elog.store/loginProcess&response_type=token';
export default function Login() {
  const inputEmail = useRef<HTMLInputElement>(null);
  const inputPassword = useRef<HTMLInputElement>(null);

  const { login } = useLoginSetting();

  const handleKeyDown = (e: { code: any }) => {
    const key = e.code;
    switch (key) {
      case 'Enter':
        login(inputEmail.current?.value, inputPassword.current?.value);
        break;
      default:
    }
  };

  return (
    <div className={cx('login')}>
      <div className={cx('background')} />
      <div className={cx('modal')}>
        <div className={cx('wrapper')}>
          <div className={cx('gray-block')}>
            <div>
              <img
                src="https://static.velog.io/static/media/undraw_joyride_hnno.fae6b95e.svg"
                alt="welcome"
              />
              <div>환영합니다!</div>
            </div>
          </div>
          <div className={cx('white-block')}>
            <Link className={cx('exit')} to="/">
              <span>×</span>
            </Link>
            <div className={cx('content')}>
              <div className={cx('container')}>
                <div className={cx('upper')}>
                  <h2>로그인</h2>
                  <section className={cx('by-email')}>
                    <h4>이메일로 로그인</h4>
                    <form>
                      <div>
                        <input
                          placeholder="이메일을 입력하세요"
                          ref={inputEmail}
                          onKeyDown={handleKeyDown}
                        />
                        <input
                          placeholder="패스워드를 입력하세요"
                          type="password"
                          ref={inputPassword}
                          onKeyDown={handleKeyDown}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          login(
                            inputEmail.current?.value,
                            inputPassword.current?.value
                          );
                        }}
                      >
                        로그인
                      </button>
                    </form>
                  </section>
                  <section className={cx('by-social')}>
                    <h4>소셜 계정으로 로그인</h4>
                    <div>
                      <a href={googleUrl}>
                        <svg
                          width="20"
                          height="20"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill="#4285F4"
                            d="M19.99 10.187c0-.82-.069-1.417-.216-2.037H10.2v3.698h5.62c-.113.92-.725 2.303-2.084 3.233l-.02.124 3.028 2.292.21.02c1.926-1.738 3.037-4.296 3.037-7.33z"
                          />
                          <path
                            fill="#34A853"
                            d="M10.2 19.931c2.753 0 5.064-.886 6.753-2.414l-3.218-2.436c-.862.587-2.017.997-3.536.997a6.126 6.126 0 0 1-5.801-4.141l-.12.01-3.148 2.38-.041.112c1.677 3.256 5.122 5.492 9.11 5.492z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M4.398 11.937a6.008 6.008 0 0 1-.34-1.971c0-.687.125-1.351.329-1.971l-.006-.132-3.188-2.42-.104.05A9.79 9.79 0 0 0 .001 9.965a9.79 9.79 0 0 0 1.088 4.473l3.309-2.502z"
                          />
                          <path
                            fill="#EB4335"
                            d="M10.2 3.853c1.914 0 3.206.809 3.943 1.484l2.878-2.746C15.253.985 12.953 0 10.199 0 6.211 0 2.766 2.237 1.09 5.492l3.297 2.503A6.152 6.152 0 0 1 10.2 3.853z"
                          />
                        </svg>
                      </a>
                    </div>
                  </section>
                </div>
                <div className={cx('footer')}>
                  <span>아직 회원이 아니신가요?</span>
                  <Link to="/register">
                    <div>회원가입</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
