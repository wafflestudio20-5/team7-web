import React, { useState } from 'react';
import Header from '../components/Header';
import HeaderMoving from '../components/HeaderMoving';
import HomeContents from '../components/HomeContents';
import { post, user } from '../contexts/types';

function ListsLiked() {
  const tempPosts: post[] = [
    {
      pid: 1,
      title: '포스트 제목',
      author: 'abcd12',
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
      author: 'abcd12',
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
      author: 'abcd12',
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
      author: 'abcd12',
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
      author: 'abcd12',
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
      author: 'abcd12',
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
  const [posts, setPosts] = useState(tempPosts);

  return <HomeContents posts={posts} />;
}

export default ListsLiked;
