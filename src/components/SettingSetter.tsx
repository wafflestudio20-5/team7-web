import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './SettingSetter.module.scss';
import { useLoginValue, useLoginSetting } from '../contexts/LoginProvider';
import { useModalActions } from '../contexts/ModalProvider';
import { showToast } from './Toast';

const cx = classNames.bind(styles);

export default function SettingSetter() {
  const [nameEdit, setNameEdit] = useState(false);
  const [titleEdit, setTitleEdit] = useState(false);
  const [socialEdit, setSocialEdit] = useState(false);
  const { open } = useModalActions();

  const { user } = useLoginValue();
  const { changeUserValue } = useLoginSetting();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    // eslint-disable-next-line camelcase
    profile_image: '',
    username: '',
    name: '',
    introduction: '',
    // eslint-disable-next-line camelcase
    velog_name: '',
    github: '',
    twitter: '',
    email: '',
    mail: '',
    facebook: '',
    homepage: '',
    about: '',
  });

  const getUser = async () => {
    try {
      const response = await axios.get('/api/v1/accounts/user/');
      setInput(response.data);
    } catch (error) {
      showToast({ type: 'error', message: '잘못된 접근입니다' });
      navigate('/');
    }
  };

  useEffect(() => {
    getUser();
  }, [user]);

  const onChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const onFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      try {
        console.log(URL.createObjectURL(e.target.files[0]));
        const response = await axios.patch('/api/v1/accounts/user/', {
          profile_image: URL.createObjectURL(e.target.files[0]),
        });
        changeUserValue(response.data);
        setInput({
          ...input,
          profile_image: URL.createObjectURL(e.target.files[0]),
        });
      } catch (error: Error | any) {
        const keys = Object.keys(error.response.data);
        const key = keys[0];
        const message = error.response.data[key][0];
        showToast({ type: 'error', message: `${key}: `.concat(message) });
      }
    }
  };

  const onFileDelete = async () => {
    try {
      const response = await axios.patch('/api/v1/accounts/user/', {
        profile_image: '',
      });
      changeUserValue(response.data);
      setInput({
        ...input,
        profile_image: '',
      });
    } catch (error: Error | any) {
      const keys = Object.keys(error.response.data);
      const key = keys[0];
      const message = error.response.data[key][0];
      showToast({ type: 'error', message: `${key}: `.concat(message) });
    }
  };

  function handleNameEdit() {
    if (nameEdit === false) {
      setNameEdit(true);
    } else {
      setNameEdit(false);
    }
  }

  function handleTitleEdit() {
    if (titleEdit === false) {
      setTitleEdit(true);
    } else {
      setTitleEdit(false);
    }
  }

  function handleSocialEdit() {
    if (socialEdit === false) {
      setSocialEdit(true);
    } else {
      setSocialEdit(false);
    }
  }

  const handleQuit = () => {
    open('회원 탈퇴', '정말로 탈퇴 하시겠습니까?');
  };

  const patchUsername = async () => {
    try {
      if (user && user.username !== input.username) {
        await axios.patch('/api/v1/accounts/user/', {
          username: input.username,
        });
      }
      const response = await axios.patch('/api/v1/accounts/user/', {
        introduction: input.introduction,
      });
      changeUserValue(response.data);
      handleNameEdit();
    } catch (error: Error | any) {
      const keys = Object.keys(error.response.data);
      const key = keys[0];
      const message = error.response.data[key][0];
      showToast({ type: 'error', message: `${key}: `.concat(message) });
    }
  };

  const patchSocial = async () => {
    try {
      const response = await axios.patch('/api/v1/accounts/user/', {
        github: input.github,
        mail: input.mail,
        homepage: input.homepage,
        facebook: input.facebook,
        twitter: input.twitter,
      });
      changeUserValue(response.data);
      handleSocialEdit();
    } catch (error: Error | any) {
      const keys = Object.keys(error.response.data);
      const key = keys[0];
      const message = error.response.data[key][0];
      showToast({ type: 'error', message: `${key}: `.concat(message) });
    }
  };

  const patchTitle = async () => {
    try {
      const response = await axios.patch('/api/v1/accounts/user/', {
        velog_name: input.velog_name,
      });
      changeUserValue(response.data);
      handleTitleEdit();
    } catch (error: Error | any) {
      const keys = Object.keys(error.response.data);
      const key = keys[0];
      const message = error.response.data[key][0];
      showToast({ type: 'error', message: `${key}: `.concat(message) });
    }
  };

  return (
    <div className={cx('setter')}>
      <section className={cx('top')}>
        <div className={cx('thumbnail')}>
          {/* eslint-disable-next-line camelcase */}
          <img src={input.profile_image} alt="profile_image" />
          <label htmlFor="profile_image">
            <input
              type="file"
              name="profile_image"
              id="profile_image"
              className={cx('blind')}
              onChange={onFileUpload}
            />
            이미지 업로드
          </label>
          <button type="button" onClick={onFileDelete}>
            이미지 제거
          </button>
        </div>
        <div className={cx('info')}>
          <div className={nameEdit ? cx('blind') : ''}>
            <h2>{input.username}</h2>
            <p>{input.introduction}</p>
            <button type="button" onClick={handleNameEdit}>
              수정
            </button>
          </div>
          <div className={nameEdit ? '' : cx('blind')}>
            <form>
              <input
                placeholder="이름"
                name="username"
                value={input.username}
                onChange={onChange}
              />
              <input
                placeholder="한 줄 소개"
                name="introduction"
                value={input.introduction}
                onChange={onChange}
              />
              <button
                type="button"
                onClick={() => {
                  patchUsername();
                }}
              >
                저장
              </button>
            </form>
          </div>
        </div>
      </section>
      <section className={cx('bottom')}>
        <div className={cx('bottom-setting')}>
          <div className={cx('wrapper')}>
            <div className={cx('title')}>
              <h3>벨로그 제목</h3>
            </div>
            <div className={cx('block')}>
              <div className={titleEdit ? cx('contents') : cx('blind')}>
                <form className={cx('velog')}>
                  {/* eslint-disable-next-line camelcase */}
                  <input
                    placeholder="벨로그 제목"
                    name="velog_name"
                    value={input.velog_name}
                    onChange={onChange}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      patchTitle();
                    }}
                  >
                    저장
                  </button>
                </form>
              </div>
              <div className={titleEdit ? cx('blind') : cx('edit')}>
                {/* eslint-disable-next-line camelcase */}
                <div>{input.velog_name}</div>
                <button type="button" onClick={handleTitleEdit}>
                  수정
                </button>
              </div>
            </div>
          </div>
          <div className={cx('description')}>
            개인 페이지의 좌측 상단에 나타나는 페이지 제목입니다.
          </div>
        </div>
        <div className={cx('bottom-setting')}>
          <div className={cx('wrapper')}>
            <div className={cx('title')}>
              <h3>소셜 정보</h3>
            </div>
            <div className={cx('block')}>
              <div className={socialEdit ? cx('contents') : cx('blind')}>
                <form className={cx('social')}>
                  <ul>
                    <li>
                      <svg
                        width="20"
                        height="20"
                        fill="none"
                        viewBox="0 0 32 32"
                      >
                        <path
                          fill="currentColor"
                          d="M16 16.871L1.019 5H30.98L16 16.871zm0 3.146L1 8.131V27h30V8.131L16 20.017z"
                        />
                      </svg>
                      <input
                        placeholder="이메일을 입력하세요"
                        name="mail"
                        value={input.mail}
                        onChange={onChange}
                      />
                    </li>
                    <li>
                      <svg
                        width="20"
                        height="20"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <mask
                          id="github"
                          width="20"
                          height="20"
                          x="0"
                          y="0"
                          maskUnits="userSpaceOnUse"
                        >
                          <path
                            fill="#ffffff"
                            fillRule="evenodd"
                            d="M6.69 15.944c0 .08-.093.145-.21.145-.133.012-.226-.053-.226-.145 0-.081.093-.146.21-.146.12-.012.226.053.226.146zm-1.255-.182c-.028.08.053.173.174.198.105.04.226 0 .25-.081.024-.08-.053-.173-.174-.21-.104-.028-.221.012-.25.093zm1.783-.068c-.117.028-.198.104-.186.197.012.08.117.133.238.105.117-.028.198-.105.186-.186-.012-.076-.121-.129-.238-.116zM9.87.242C4.278.242 0 4.488 0 10.08c0 4.471 2.815 8.298 6.835 9.645.516.093.697-.226.697-.488 0-.25-.012-1.63-.012-2.476 0 0-2.822.605-3.415-1.202 0 0-.46-1.173-1.121-1.475 0 0-.924-.633.064-.621 0 0 1.004.08 1.557 1.04.883 1.557 2.363 1.109 2.94.843.092-.645.354-1.093.645-1.36-2.255-.25-4.529-.576-4.529-4.455 0-1.109.307-1.665.952-2.375-.105-.262-.448-1.342.105-2.738C5.56 4.157 7.5 5.51 7.5 5.51a9.474 9.474 0 0 1 2.532-.344c.86 0 1.726.117 2.533.343 0 0 1.939-1.355 2.782-1.089.552 1.4.21 2.476.105 2.738.645.714 1.04 1.27 1.04 2.375 0 3.891-2.375 4.202-4.63 4.456.372.319.686.923.686 1.87 0 1.36-.012 3.041-.012 3.372 0 .262.186.58.698.488C17.266 18.379 20 14.552 20 10.08 20 4.488 15.464.24 9.871.24zM3.919 14.149c-.052.04-.04.133.029.21.064.064.157.093.21.04.052-.04.04-.133-.029-.21-.064-.064-.157-.092-.21-.04zm-.435-.326c-.028.052.012.117.093.157.064.04.145.028.173-.028.028-.053-.012-.117-.093-.158-.08-.024-.145-.012-.173.029zm1.306 1.435c-.064.053-.04.174.053.25.092.093.21.105.262.04.052-.052.028-.173-.053-.25-.088-.092-.21-.104-.262-.04zm-.46-.593c-.064.04-.064.146 0 .238.065.093.174.133.226.093.065-.053.065-.157 0-.25-.056-.093-.16-.133-.225-.08z"
                            clipRule="evenodd"
                          />
                        </mask>
                        <g mask="url(#github)">
                          <path fill="currentColor" d="M0 0h20v20H0z" />
                        </g>
                      </svg>
                      <input
                        placeholder="Github 계정을 입력하세요"
                        name="github"
                        value={input.github}
                        onChange={onChange}
                      />
                    </li>
                    <li>
                      <svg
                        width="20"
                        height="20"
                        fill="none"
                        viewBox="0 0 32 32"
                      >
                        <g clipPath="url(#twitter)">
                          <path
                            fill="currentColor"
                            d="M32 6.076a13.108 13.108 0 0 1-3.77 1.033 6.576 6.576 0 0 0 2.886-3.632 13.151 13.151 0 0 1-4.17 1.594 6.554 6.554 0 0 0-4.791-2.074c-4.239 0-7.354 3.955-6.396 8.06C10.304 10.784 5.467 8.171 2.228 4.2a6.574 6.574 0 0 0 2.03 8.765 6.538 6.538 0 0 1-2.971-.821c-.072 3.041 2.108 5.886 5.265 6.52-.924.25-1.936.309-2.965.112a6.57 6.57 0 0 0 6.133 4.558A13.2 13.2 0 0 1 0 26.053a18.585 18.585 0 0 0 10.064 2.95c12.19 0 19.076-10.295 18.66-19.528A13.366 13.366 0 0 0 32 6.076z"
                          />
                        </g>
                        <defs>
                          <clipPath id="twitter">
                            <path fill="#fff" d="M0 0h32v32H0z" />
                          </clipPath>
                        </defs>
                      </svg>
                      <input
                        placeholder="Twitter 계정을 입력하세요"
                        name="twitter"
                        value={input.twitter}
                        onChange={onChange}
                      />
                    </li>
                    <li>
                      <svg
                        width="20"
                        height="20"
                        fill="none"
                        viewBox="0 0 32 32"
                      >
                        <path
                          fill="currentColor"
                          d="M32 5.334C32 2.53 29.47 0 26.667 0H5.333C2.53 0 0 2.531 0 5.334v21.332C0 29.47 2.53 32 5.334 32H16V19.911h-3.911v-5.333H16V12.5c0-3.584 2.69-6.811 6-6.811h4.311v5.333H22c-.472 0-1.022.573-1.022 1.431v2.125h5.333v5.333h-5.333V32h5.689C29.47 32 32 29.469 32 26.666V5.334z"
                        />
                      </svg>
                      <input
                        placeholder="https://www.facebook.com/"
                        name="facebook"
                        value={input.facebook}
                        onChange={onChange}
                      />
                    </li>
                    <li>
                      <svg
                        width="20"
                        height="20"
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                      </svg>
                      <input
                        placeholder="홈페이지 주소를 입력하세요"
                        name="homepage"
                        value={input.homepage}
                        onChange={onChange}
                      />
                    </li>
                  </ul>
                  <div className={cx('button-wrapper')}>
                    <button
                      type="button"
                      onClick={() => {
                        patchSocial();
                      }}
                    >
                      저장
                    </button>
                  </div>
                </form>
              </div>
              <div className={!socialEdit ? cx('edit') : cx('blind')}>
                <ul>
                  {input.mail && (
                    <li>
                      <svg
                        width="20"
                        height="20"
                        fill="none"
                        viewBox="0 0 32 32"
                      >
                        <path
                          fill="currentColor"
                          d="M16 16.871L1.019 5H30.98L16 16.871zm0 3.146L1 8.131V27h30V8.131L16 20.017z"
                        />
                      </svg>
                      <span>{input.mail}</span>
                    </li>
                  )}
                  {input.github && (
                    <li>
                      <svg
                        width="20"
                        height="20"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <mask
                          id="github"
                          width="20"
                          height="20"
                          x="0"
                          y="0"
                          maskUnits="userSpaceOnUse"
                        >
                          <path
                            fill="#ffffff"
                            fillRule="evenodd"
                            d="M6.69 15.944c0 .08-.093.145-.21.145-.133.012-.226-.053-.226-.145 0-.081.093-.146.21-.146.12-.012.226.053.226.146zm-1.255-.182c-.028.08.053.173.174.198.105.04.226 0 .25-.081.024-.08-.053-.173-.174-.21-.104-.028-.221.012-.25.093zm1.783-.068c-.117.028-.198.104-.186.197.012.08.117.133.238.105.117-.028.198-.105.186-.186-.012-.076-.121-.129-.238-.116zM9.87.242C4.278.242 0 4.488 0 10.08c0 4.471 2.815 8.298 6.835 9.645.516.093.697-.226.697-.488 0-.25-.012-1.63-.012-2.476 0 0-2.822.605-3.415-1.202 0 0-.46-1.173-1.121-1.475 0 0-.924-.633.064-.621 0 0 1.004.08 1.557 1.04.883 1.557 2.363 1.109 2.94.843.092-.645.354-1.093.645-1.36-2.255-.25-4.529-.576-4.529-4.455 0-1.109.307-1.665.952-2.375-.105-.262-.448-1.342.105-2.738C5.56 4.157 7.5 5.51 7.5 5.51a9.474 9.474 0 0 1 2.532-.344c.86 0 1.726.117 2.533.343 0 0 1.939-1.355 2.782-1.089.552 1.4.21 2.476.105 2.738.645.714 1.04 1.27 1.04 2.375 0 3.891-2.375 4.202-4.63 4.456.372.319.686.923.686 1.87 0 1.36-.012 3.041-.012 3.372 0 .262.186.58.698.488C17.266 18.379 20 14.552 20 10.08 20 4.488 15.464.24 9.871.24zM3.919 14.149c-.052.04-.04.133.029.21.064.064.157.093.21.04.052-.04.04-.133-.029-.21-.064-.064-.157-.092-.21-.04zm-.435-.326c-.028.052.012.117.093.157.064.04.145.028.173-.028.028-.053-.012-.117-.093-.158-.08-.024-.145-.012-.173.029zm1.306 1.435c-.064.053-.04.174.053.25.092.093.21.105.262.04.052-.052.028-.173-.053-.25-.088-.092-.21-.104-.262-.04zm-.46-.593c-.064.04-.064.146 0 .238.065.093.174.133.226.093.065-.053.065-.157 0-.25-.056-.093-.16-.133-.225-.08z"
                            clipRule="evenodd"
                          />
                        </mask>
                        <g mask="url(#github)">
                          <path fill="currentColor" d="M0 0h20v20H0z" />
                        </g>
                      </svg>
                      <span>{input.github}</span>
                    </li>
                  )}
                  {input.twitter && (
                    <li>
                      <svg
                        width="20"
                        height="20"
                        fill="none"
                        viewBox="0 0 32 32"
                      >
                        <g clipPath="url(#twitter)">
                          <path
                            fill="currentColor"
                            d="M32 6.076a13.108 13.108 0 0 1-3.77 1.033 6.576 6.576 0 0 0 2.886-3.632 13.151 13.151 0 0 1-4.17 1.594 6.554 6.554 0 0 0-4.791-2.074c-4.239 0-7.354 3.955-6.396 8.06C10.304 10.784 5.467 8.171 2.228 4.2a6.574 6.574 0 0 0 2.03 8.765 6.538 6.538 0 0 1-2.971-.821c-.072 3.041 2.108 5.886 5.265 6.52-.924.25-1.936.309-2.965.112a6.57 6.57 0 0 0 6.133 4.558A13.2 13.2 0 0 1 0 26.053a18.585 18.585 0 0 0 10.064 2.95c12.19 0 19.076-10.295 18.66-19.528A13.366 13.366 0 0 0 32 6.076z"
                          />
                        </g>
                        <defs>
                          <clipPath id="twitter">
                            <path fill="#fff" d="M0 0h32v32H0z" />
                          </clipPath>
                        </defs>
                      </svg>
                      <span>{input.twitter}</span>
                    </li>
                  )}
                  {input.facebook && (
                    <li>
                      <svg
                        width="20"
                        height="20"
                        fill="none"
                        viewBox="0 0 32 32"
                      >
                        <path
                          fill="currentColor"
                          d="M32 5.334C32 2.53 29.47 0 26.667 0H5.333C2.53 0 0 2.531 0 5.334v21.332C0 29.47 2.53 32 5.334 32H16V19.911h-3.911v-5.333H16V12.5c0-3.584 2.69-6.811 6-6.811h4.311v5.333H22c-.472 0-1.022.573-1.022 1.431v2.125h5.333v5.333h-5.333V32h5.689C29.47 32 32 29.469 32 26.666V5.334z"
                        />
                      </svg>
                      <span>{input.facebook}</span>
                    </li>
                  )}
                  {input.homepage && (
                    <li>
                      <svg
                        width="20"
                        height="20"
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                      </svg>
                      <span>{input.homepage}</span>
                    </li>
                  )}
                </ul>
                {!input.homepage &&
                !input.github &&
                !input.mail &&
                !input.facebook &&
                !input.twitter ? (
                  <button type="button" onClick={handleSocialEdit}>
                    정보 추가
                  </button>
                ) : (
                  <button type="button" onClick={handleSocialEdit}>
                    수정
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className={cx('description')}>
            포스트 및 블로그에서 보여지는 프로필에 공개되는 소셜 정보입니다.
          </div>
        </div>
        <div className={cx('bottom-setting')}>
          <div className={cx('wrapper')}>
            <div className={cx('title')}>
              <h3>이메일 주소</h3>
            </div>
            <div className={cx('block')}>
              <div className={cx('contents')}>{input.email}</div>
            </div>
          </div>
          <div className={cx('description')}>
            회원 인증 또는 시스템에서 발송하는 이메일을 수신하는 주소입니다.
          </div>
        </div>
        <div className={cx('bottom-setting')}>
          <div className={cx('wrapper')}>
            <div className={cx('title')}>
              <h3>회원 탈퇴</h3>
            </div>
            <div className={cx('block')}>
              <div className={cx('contents')}>
                <button
                  className={cx('quit')}
                  type="button"
                  onClick={handleQuit}
                >
                  회원 탈퇴
                </button>
              </div>
            </div>
          </div>
          <div className={cx('description')}>
            탈퇴 시 작성하신 포스트 및 댓글이 모두 삭제되며 복구되지 않습니다.
          </div>
        </div>
      </section>
    </div>
  );
}
