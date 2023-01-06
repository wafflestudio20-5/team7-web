import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SettingSetter.module.scss';

const cx = classNames.bind(styles);

type SettingSetterProps = {
  openQuitModal: () => void;
};

export default function SettingSetter({ openQuitModal }: SettingSetterProps) {
  const [nameEdit, setNameEdit] = useState(false);
  const [titleEdit, setTitleEdit] = useState(false);
  const [socialEdit, setSocialEdit] = useState(false);

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

  return (
    <div className={cx('setter')}>
      <section className={cx('top')}>
        <div className={cx('thumbnail')}>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAASbSURBVHgB7Z0tTytBFIYP914BDiQ4cIADB0EhwYFE8ifq7g/hJ2CRSCQ4kOCobF3ruHk3maS5aSnbdnfPOe/7JE0oCTvTnmc+dvbMsNbr9b5M0PLLBDUSgBwJQI4EIEcCkCMByJEA5EgAciQAORKAHAlAjgQgRwKQIwHIkQDkSAByJAA5EoAcCUCOBCBHApAjAciRAORIAHIkADkSgBwJQI4EIEcCkCMByJEA5EgAciQAOX+MhPX1dTs+Prbt7W3b3d21jY2N6ndgPB7bYDCw4XBor6+v9vHxUb1nIL0Ae3t7dn5+XgV9FhABYuC1v79f/Q4SPD8/28vLi2UmrQA/Cfx34O/wwjXu7u7S9gi/z87O/loyELTr62vb2tqyZcFQcXp6Wv2MXiEb6SaBCDwEWDVFqmykEgABOjo6sqbAtbNJkEaAi4uLRoNfQBmXl5eWhRQCIChlnG6Dk5OTVstrkvACYKLXxJg/D5RZ1hEiE14ABGIVs/26IPgZeoHQAiDwbYz7s4AA0XuB0AIsusizKsrycmRCC+Dhyz84OLDIhBUAra/rHgCgDpGHgbAC7OzsmBc81aUuYQXY3Nw0L3iqS13CCtDFrd8sPNWlLsoIIkcCkBNWAE8JGpGTRcIKgPw9L3iqS13CCvD5+Wle8FSXuoQVAJm8HlK0UAfUJSqhJ4Fvb2/WNcgcjkxoAfDld936oieKhhYAwX96erKuwJ6B6Oni4dcBIEAXvQAC//j4aNEJLwCC30UgUGaGzSIpVgLRC7Q5FKCsLFvG0iwFPzw8tBIUlIGyspDqWcD9/X2jEuDaKCMT6R4GIUBNzAlwzWzBByl3ByNYaK23t7dLP6vHfT6u9/7+bhlZ6/V6X5YYpI0jebRu/mD2wBfSHxCBngAv9ASQ4PDwsErhwvvJE0JGo1EV9H6/72KFsS1SCDAZyFngnh2vVUwSUV4WQUILULZnlR06aMGYqDW1QDN56khZho6+Ghh2DoBgXF1dTZ3koZWvcqWubECdtg0NZUQ+QiakAGjxOA9gHhABj4wXeWyMHgX5/j85Zwi9AXoeD4+n6xJOAASk7nbwkjyCGT0meXg/mcWDYOMsIJwShtaO3mWRHT/odaINCaHmAIsEHyCQOP6tHAHXFKVukSQIsxK4aPDbBnWMdG5ACAHwhUYIfgHzEwwjEXAvQFdHwCzLzc1NiC1jrgXA2I31/Ijbr1HnCEfKuRagq/N/VgXuJLzPB9wKgMBnOITJu8RuBUDXnwHvQ4FLAbDkGrnr/x8MBV7vClwKEHHWPw+vn8mdANlaf8FrL+BOgIytv+Dxs7kSAC0kY+sveOwFXAnQ5bGvbdH0A6m6uBLAw8GPTePtaFk3AmTv/gtYF/A0DLgRgKH1Fzx9VjcCIBuHBU89nRsBkKrFgqfNJm5SwpBGVc7fz/CvWKZRUsk9bS1PvzVMfI+OiiVHApAjAciRAORIAHIkADkSgBwJQI4EIEcCkCMByJEA5EgAciQAORKAHAlAjgQgRwKQIwHIkQDkSAByJAA5EoAcCUCOBCBHApAjAciRAORIAHIkADkSgBwJQI4EIOcfGjV2tEfztqEAAAAASUVORK5CYII="
            alt="user-thumbnail"
          />
          <input type="file" id="input-image" className={cx('blind')} />
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="input-image">이미지 업로드</label>
          <button type="button">이미지 제거</button>
        </div>
        <div className={cx('info')}>
          <div className={nameEdit ? cx('blind') : ''}>
            <h2>아이디</h2>
            <p>한 줄 소개</p>
            <button type="button" onClick={openNameEdit}>
              수정
            </button>
          </div>
          <div className={nameEdit ? '' : cx('blind')}>
            <form>
              <input placeholder="이름" />
              <input placeholder="한 줄 소개" />
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
                  <input placeholder="벨로그 제목" />
                  <button type="button" onClick={openTitleEdit}>
                    저장
                  </button>
                </form>
              </div>
              <div className={titleEdit ? cx('blind') : cx('edit')}>
                <div>abc</div>
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
                      <input placeholder="이메일을 입력하세요" />
                    </li>
                    <li>
                      <input placeholder="Github 계정을 입력하세요" />
                    </li>
                    <li>
                      <input placeholder="Twitter 계정을 입력하세요" />
                    </li>
                    <li>
                      <input placeholder="https://www.facebook.com/" />
                    </li>
                    <li>
                      <input placeholder="이메일을 입력하세요" />
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
              <div className={cx('contents')}>abc@naver.com</div>
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
                  onClick={openQuitModal}
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
