import React, { useState, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './SettingSetter.module.scss';
import { useLoginValue } from '../contexts/LoginProvider';
import { useModalActions } from '../contexts/ModalProvider';

const cx = classNames.bind(styles);

export default function SettingSetter() {
  const [nameEdit, setNameEdit] = useState(false);
  const [titleEdit, setTitleEdit] = useState(false);
  const [socialEdit, setSocialEdit] = useState(false);
  const { open } = useModalActions();

  const { user } = useLoginValue();
  const {
    userImg,
    id,
    username,
    description,
    // eslint-disable-next-line camelcase
    velog_name,
    github,
    twitter,
    mail,
    facebook,
    homepage,
  } = user || {};

  const [input, setInput] = useState({
    userImg,
    username,
    description,
    // eslint-disable-next-line camelcase
    velog_name,
    github,
    twitter,
    mail,
    facebook,
    homepage,
  });

  const onChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  function openNameEdit() {
    if (nameEdit === false) {
      setNameEdit(true);
    } else {
      setNameEdit(false);
    }
  }

  function openTitleEdit() {
    if (titleEdit === false) {
      setTitleEdit(true);
    } else {
      setTitleEdit(false);
    }
  }

  function openSocialEdit() {
    if (socialEdit === false) {
      setSocialEdit(true);
    } else {
      setSocialEdit(false);
    }
  }

  const handleQuit = () => {
    open('회원 탈퇴', '정말로 탈퇴 하시겠습니까?');
  };

  return (
    <div className={cx('setter')}>
      <section className={cx('top')}>
        <div className={cx('thumbnail')}>
          <img src={userImg} alt="user-thumbnail" />
          <label htmlFor="input-image">
            <input
              type="file"
              name="userImg"
              id="input-image"
              className={cx('blind')}
              onChange={onChange}
            />
            이미지 업로드
          </label>
          <button type="button">이미지 제거</button>
        </div>
        <div className={cx('info')}>
          <div className={nameEdit ? cx('blind') : ''}>
            <h2>{input.username}</h2>
            <p>{input.description}</p>
            <button type="button" onClick={openNameEdit}>
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
                name="description"
                value={input.description}
                onChange={onChange}
              />
              <button type="button" onClick={openNameEdit}>
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
                  <button type="button" onClick={openTitleEdit}>
                    저장
                  </button>
                </form>
              </div>
              <div className={titleEdit ? cx('blind') : cx('edit')}>
                {/* eslint-disable-next-line camelcase */}
                <div>{input.velog_name}</div>
                <button type="button" onClick={openTitleEdit}>
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
                      <input
                        placeholder="이메일을 입력하세요"
                        name="mail"
                        value={input.mail}
                        onChange={onChange}
                      />
                    </li>
                    <li>
                      <input
                        placeholder="Github 계정을 입력하세요"
                        name="github"
                        value={input.github}
                        onChange={onChange}
                      />
                    </li>
                    <li>
                      <input
                        placeholder="Twitter 계정을 입력하세요"
                        name="twitter"
                        value={input.twitter}
                        onChange={onChange}
                      />
                    </li>
                    <li>
                      <input
                        placeholder="https://www.facebook.com/"
                        name="facebook"
                        value={input.facebook}
                        onChange={onChange}
                      />
                    </li>
                    <li>
                      <input
                        placeholder="홈페이지 주소를 입력하세요"
                        name="homepage"
                        value={input.homepage}
                        onChange={onChange}
                      />
                    </li>
                  </ul>
                  <div className={cx('button-wrapper')}>
                    <button type="button" onClick={openSocialEdit}>
                      저장
                    </button>
                  </div>
                </form>
              </div>
              <div className={socialEdit ? cx('blind') : cx('edit')}>
                <button type="button" onClick={openSocialEdit}>
                  정보 추가
                </button>
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
              <div className={cx('contents')}>{id}</div>
            </div>
          </div>
          <div className={cx('description')}>
            회원 인증 또는 시스템에서 발송하는 이메일을 수신하는 주소입니다.
          </div>
        </div>
        <div className={cx('bottom-setting')}>
          <div className={cx('wrapper')}>
            <div className={cx('title')}>
              <h3>이메일 수신 설정</h3>
            </div>
            <div className={cx('block')}>
              <div className={cx('contents')}>
                <ul>
                  <li>
                    <span>댓글 알림</span>
                  </li>
                  <li>
                    <span>벨로그 업데이트 소식</span>
                  </li>
                </ul>
              </div>
            </div>
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
