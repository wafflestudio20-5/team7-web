import React from 'react';
// eslint-disable-next-line import/extensions,import/no-unresolved
import classNames from 'classnames/bind';
// eslint-disable-next-line import/extensions,import/no-unresolved
import styles from './TagsTag.module.scss';
// eslint-disable-next-line import/extensions,import/no-unresolved
import Header from '../components/Header';
// eslint-disable-next-line import/extensions,import/no-unresolved
import BigPostComp from '../components/BigPostComp';

const cx = classNames.bind(styles);

const tag = {
  name: 'JavaScript',
  thumbnail: 'https://images.velog.io/tags/JavaScript.png',
  intro:
    'JavaScript(JS)는 가벼운 인터프리터 또는 JIT 컴파일 프로그래밍 언어로, 일급 함수를 지원합니다. 웹 페이지의 스크립트 언어로서 제일 유명하지만 Node.js, Apache CouchDB, Adobe Acrobat처럼 많은 비 브라우저 환경에서도 사용하고 있습니다. JavaScript는 프로토타입 기반의 동적 다중 패러다임 스크립트 언어로, 객체지향형, 명령형, 선언형(함수형 프로그래밍 등) 스타일을 지원합니다.',
  postCount: 50498,
};
interface post {
  id: number;
  title: string;
  url: string;
  intro: string;
  thumbnail: string;
  seriesTitle: string;
  seriesId: number;
  tags: string[];
  date: string;
  comments: number;
  authorId: string;
  authorImg: string;
  heart: number;
}
const tagPosts: post[] = [
  {
    id: 1,
    title: '포스트 제목입니다',
    url: 'post-title-1',
    intro: '포스트를 소개해주세요.',
    thumbnail: 'https://pbs.twimg.com/media/Ct9Zp2UVYAAcnEt.jpg',
    seriesTitle: 'series1',
    seriesId: 1,
    tags: ['tagA', 'tagB', 'tagC'],
    date: '2022년 10월 31일',
    comments: 10,
    authorId: '2-0-is',
    authorImg: '',
    heart: 10,
  },
  {
    id: 2,
    title: '포스트 제목입니다',
    url: 'post-title-2',
    intro: '포스트를 소개해주세요.',
    thumbnail: 'https://pbs.twimg.com/media/Ct9Zp2UVYAAcnEt.jpg',
    seriesTitle: 'series1',
    seriesId: 2,
    tags: ['tagA', 'tagB', 'tagC'],
    date: '2022년 10월 31일',
    comments: 10,
    authorId: '2-0-is',
    authorImg: '',
    heart: 10,
  },
  {
    id: 3,
    title: '포스트 제목입니다',
    url: 'post-title-3',
    intro: '포스트를 소개해주세요.',
    thumbnail: 'https://pbs.twimg.com/media/Ct9Zp2UVYAAcnEt.jpg',
    seriesTitle: 'series1',
    seriesId: 3,
    tags: ['tagA', 'tagB', 'tagC'],
    date: '2022년 10월 31일',
    comments: 10,
    authorId: '2-0-is',
    authorImg: '',
    heart: 10,
  },
  {
    id: 4,
    title: '포스트 제목입니다',
    url: 'post-title-4',
    intro: '포스트를 소개해주세요.',
    thumbnail: 'https://pbs.twimg.com/media/Ct9Zp2UVYAAcnEt.jpg',
    seriesTitle: '',
    seriesId: 0,
    tags: [],
    date: '2022년 10월 31일',
    comments: 10,
    authorId: '2-0-is',
    authorImg: '',
    heart: 10,
  },
];

function TagsTag() {
  return (
    <div className={cx('page')}>
      <Header />
      <main>
        <div className={cx('body')}>
          <div className={cx('tagInfo')}>
            <img src={tag.thumbnail} alt={tag.thumbnail} />
            <h1># {tag.name}</h1>
            <p>{tag.intro}</p>
            <div className={cx('count')}>총 {tag.postCount}개의 포스트</div>
          </div>
          <div>
            {tagPosts.map((postInfo: post) => (
              <BigPostComp key={postInfo.id} postInfo={postInfo} username="" />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default TagsTag;
