import React from 'react';
import classNames from 'classnames/bind';
import styles from './FollowSetter.module.scss';
import deleteIcon from '../resources/delete.png';
import { user } from '../contexts/types';

const cx = classNames.bind(styles);

function User({ user }: { user: user }) {
  return (
    <a className={cx('user')} href={'@'.concat(user.username)}>
      <img className={cx('delete')} src={deleteIcon} alt="delete" />
      <img className={cx('profile')} src={user.profile_image} alt="profile" />
      {user.username}
    </a>
  );
}

export default function FollowSetter() {
  const tempUsers: user[] = [
    {
      username: 'abcd12',
      velog_name: 'abcd12의 velog',
      email: 'mail',
      name: 'abcd',
      profile_image:
        'https://velog.velcdn.com/images/silky225/profile/f3d11391-6a64-4cf0-9889-46778956d77e/social_profile.png',
      introduction: '벨로그 설명',
      github: '깃허브 링크',
      twitter: '트위터 링크',
      facebook: '페이스북 링크',
      homepage: '홈페이지 링크',
      mail: '메일 링크',
      about: '',
    },
    {
      username: 'abcd13',
      velog_name: 'abcd13의 velog',
      email: 'mail',
      name: 'abcd',
      profile_image:
        'https://velog.velcdn.com/images/silky225/profile/f3d11391-6a64-4cf0-9889-46778956d77e/social_profile.png',
      introduction: '벨로그 설명',
      github: '깃허브 링크',
      twitter: '트위터 링크',
      facebook: '페이스북 링크',
      homepage: '홈페이지 링크',
      mail: '메일 링크',
      about: '',
    },
    {
      username: 'abcd14',
      velog_name: 'abcd14의 velog',
      email: 'mail',
      name: 'abcd',
      profile_image:
        'https://velog.velcdn.com/images/silky225/profile/f3d11391-6a64-4cf0-9889-46778956d77e/social_profile.png',
      introduction: '벨로그 설명',
      github: '깃허브 링크',
      twitter: '트위터 링크',
      facebook: '페이스북 링크',
      homepage: '홈페이지 링크',
      mail: '메일 링크',
      about: '',
    },
    {
      username: 'abcd15',
      velog_name: 'abcd15의 velog',
      email: 'mail',
      name: 'abcd',
      profile_image:
        'https://velog.velcdn.com/images/silky225/profile/f3d11391-6a64-4cf0-9889-46778956d77e/social_profile.png',
      introduction: '벨로그 설명',
      github: '깃허브 링크',
      twitter: '트위터 링크',
      facebook: '페이스북 링크',
      homepage: '홈페이지 링크',
      mail: '메일 링크',
      about: '',
    },
    {
      username: 'abcd16',
      velog_name: 'abcd16의 velog',
      email: 'mail',
      name: 'abcd',
      profile_image:
        'https://velog.velcdn.com/images/silky225/profile/f3d11391-6a64-4cf0-9889-46778956d77e/social_profile.png',
      introduction: '벨로그 설명',
      github: '깃허브 링크',
      twitter: '트위터 링크',
      facebook: '페이스북 링크',
      homepage: '홈페이지 링크',
      mail: '메일 링크',
      about: '',
    },
    {
      username: 'abcd17',
      velog_name: 'abcd17의 velog',
      email: 'mail',
      name: 'abcd',
      profile_image:
        'https://velog.velcdn.com/images/silky225/profile/f3d11391-6a64-4cf0-9889-46778956d77e/social_profile.png',
      introduction: '벨로그 설명',
      github: '깃허브 링크',
      twitter: '트위터 링크',
      facebook: '페이스북 링크',
      homepage: '홈페이지 링크',
      mail: '메일 링크',
      about: '',
    },
    {
      username: 'abcd18',
      velog_name: 'abcd12의 velog',
      email: 'mail',
      name: 'abcd',
      profile_image:
        'https://velog.velcdn.com/images/silky225/profile/f3d11391-6a64-4cf0-9889-46778956d77e/social_profile.png',
      introduction: '벨로그 설명',
      github: '깃허브 링크',
      twitter: '트위터 링크',
      facebook: '페이스북 링크',
      homepage: '홈페이지 링크',
      mail: '메일 링크',
      about: '',
    },
    {
      username: 'abcd19',
      velog_name: 'abcd12의 velog',
      email: 'mail',
      name: 'abcd',
      profile_image:
        'https://velog.velcdn.com/images/silky225/profile/f3d11391-6a64-4cf0-9889-46778956d77e/social_profile.png',
      introduction: '벨로그 설명',
      github: '깃허브 링크',
      twitter: '트위터 링크',
      facebook: '페이스북 링크',
      homepage: '홈페이지 링크',
      mail: '메일 링크',
      about: '',
    },
  ];

  return (
    <div className={cx('followSetter')}>
      <div className={cx('following')}>
        <h3>팔로잉 목록</h3>
        <p>내가 구독하고 있는 사용자 목록입니다.</p>
        <div className={cx('followings')}>
          {tempUsers.map(user => (
            <User user={user} />
          ))}
        </div>
      </div>
      <div className={cx('follower')}>
        <h3>팔로워 목록</h3>
        <p>나를 구독하고 있는 사용자 목록입니다.</p>
        <div className={cx('followers')}>
          {tempUsers.map(user => (
            <User user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}
