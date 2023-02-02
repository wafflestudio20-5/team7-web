import React from 'react';
import PostComp from '../../components/PostComp';
import { post, user } from '../../contexts/types';
import styles from './InterestPost.module.scss';

const dummyUser: user = {
  username: 'id',
  velog_name: 'velog',
  email: 'mail',
  name: 'name',
  profile_image:
    'https://velog.velcdn.com/images/shinhw371/profile/2a470881-5a62-429f-97fb-c449c2dc1911/social_profile.png',
  introduction: 'desc',
  github: 'git',
  twitter: 'twit',
  facebook: 'face',
  homepage: 'home',
  mail: 'mail',
  about: 'about',
};

const tempPosts: post[] = [
  {
    pid: 1,
    title: '포스트 제목',
    author: 'id',
    url: 'userID/personalPost',
    preview: '포스트 미리보기',
    thumbnail:
      'https://th.bing.com/th/id/R.d01dd3fd4074d38334656a25a511dd5a?rik=x6upOuofKEAgRQ&riu=http%3a%2f%2fwww.etoland.co.kr%2fdata%2fdaumeditor02%2f200202%2f56492515806018600.jpg&ehk=e7vLw%2bHjTj3q2eX6TnrulH77vFS5G4qzokeLISh%2brRM%3d&risl=&pid=ImgRaw&r=0',
    tags: ['html', 'css'],
    created_at: '2022년 4월 20일',
    updated_at: '2022년 4월 20일',
    comments: 12,
    likes: 24,
    is_private: true,
  },
  {
    pid: 2,
    title: '포스트 제목',
    author: 'id',
    url: 'userID/personalPost',
    preview: '포스트 미리보기',
    thumbnail:
      'https://th.bing.com/th/id/R.d01dd3fd4074d38334656a25a511dd5a?rik=x6upOuofKEAgRQ&riu=http%3a%2f%2fwww.etoland.co.kr%2fdata%2fdaumeditor02%2f200202%2f56492515806018600.jpg&ehk=e7vLw%2bHjTj3q2eX6TnrulH77vFS5G4qzokeLISh%2brRM%3d&risl=&pid=ImgRaw&r=0',
    tags: ['html', 'css'],
    created_at: '2022년 4월 20일',
    updated_at: '2022년 4월 20일',
    comments: 12,
    likes: 24,
    is_private: true,
  },
  {
    pid: 3,
    title: '포스트 제목',
    author: 'id',
    url: 'userID/personalPost',
    preview: '포스트 미리보기',
    thumbnail:
      'https://th.bing.com/th/id/R.d01dd3fd4074d38334656a25a511dd5a?rik=x6upOuofKEAgRQ&riu=http%3a%2f%2fwww.etoland.co.kr%2fdata%2fdaumeditor02%2f200202%2f56492515806018600.jpg&ehk=e7vLw%2bHjTj3q2eX6TnrulH77vFS5G4qzokeLISh%2brRM%3d&risl=&pid=ImgRaw&r=0',
    tags: ['html', 'css'],
    created_at: '2022년 4월 20일',
    updated_at: '2022년 4월 20일',
    comments: 12,
    likes: 24,
    is_private: true,
  },
  {
    pid: 4,
    title: '포스트 제목',
    author: 'id',
    url: 'userID/personalPost',
    preview: '포스트 미리보기',
    thumbnail:
      'https://th.bing.com/th/id/R.d01dd3fd4074d38334656a25a511dd5a?rik=x6upOuofKEAgRQ&riu=http%3a%2f%2fwww.etoland.co.kr%2fdata%2fdaumeditor02%2f200202%2f56492515806018600.jpg&ehk=e7vLw%2bHjTj3q2eX6TnrulH77vFS5G4qzokeLISh%2brRM%3d&risl=&pid=ImgRaw&r=0',
    tags: ['html', 'css'],
    created_at: '2022년 4월 20일',
    updated_at: '2022년 4월 20일',
    comments: 12,
    likes: 24,
    is_private: true,
  },
  {
    pid: 5,
    title: '포스트 제목',
    author: 'id',
    url: 'userID/personalPost',
    preview: '포스트 미리보기',
    thumbnail:
      'https://th.bing.com/th/id/R.d01dd3fd4074d38334656a25a511dd5a?rik=x6upOuofKEAgRQ&riu=http%3a%2f%2fwww.etoland.co.kr%2fdata%2fdaumeditor02%2f200202%2f56492515806018600.jpg&ehk=e7vLw%2bHjTj3q2eX6TnrulH77vFS5G4qzokeLISh%2brRM%3d&risl=&pid=ImgRaw&r=0',
    tags: ['html', 'css'],
    created_at: '2022년 4월 20일',
    updated_at: '2022년 4월 20일',
    comments: 12,
    likes: 24,
    is_private: true,
  },
  {
    pid: 6,
    title: '포스트 제목',
    author: 'id',
    url: 'userID/personalPost',
    preview: '포스트 미리보기',
    thumbnail:
      'https://th.bing.com/th/id/R.d01dd3fd4074d38334656a25a511dd5a?rik=x6upOuofKEAgRQ&riu=http%3a%2f%2fwww.etoland.co.kr%2fdata%2fdaumeditor02%2f200202%2f56492515806018600.jpg&ehk=e7vLw%2bHjTj3q2eX6TnrulH77vFS5G4qzokeLISh%2brRM%3d&risl=&pid=ImgRaw&r=0',
    tags: ['html', 'css'],
    created_at: '2022년 4월 20일',
    updated_at: '2022년 4월 20일',
    comments: 12,
    likes: 24,
    is_private: true,
  },
];

function InterestPost() {
  return (
    <div className={styles.background}>
      <div className={styles.title}>관심 있을 만한 포스트</div>
      <div className={styles.container}>
        <div className={styles.post_container}>
          {tempPosts.map(post => {
            return <PostComp post={post} key={post.pid} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default InterestPost;
