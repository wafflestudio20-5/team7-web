/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import React from 'react';

export type user = {
  username: string;
  velog_name: string;
  email: string;
  name: string;
  profile_image: string;
  introduction: string;
  github: string;
  twitter: string;
  facebook: string;
  homepage: string;
  mail: string;
  about: string;
}; // user의 rough 정보

export type post = {
  pid: number;
  title: string;
  author: string;
  url: string;
  preview: string;
  thumbnail: string;
  tags: tag[];
  created_at: string;
  updated_at: string;
  comments: number;
  likes: number;
  is_private: boolean;
}; // component를 위한 post 정보

export type commentType = {
  cid: number;
  post: number;
  author: string;
  created_at: string;
  content: string;
  parent_comment: number;
  comment_like_count: number;
}; // 댓글 상세 정보

export type postDetail = {
  pid: number;
  title: string;
  author: string;
  url: string;
  preview: string;
  thumbnail: string;
  tags: tag[];
  created_at: string;
  updated_at: string;
  content: string;
  series: seriesDetail | null;
  prev_post: post | null;
  next_post: post | null;
  comments: commentType[];
  likes: number;
  is_private: boolean;
  is_active: boolean;
  create_tag: string;
}; // post별 page에서 필요한 post 정보

export type seriesPost = {
  series_order: number;
  post: post;
}; // 각 series별 page에서 필요한 post 정보

export type series = {
  id: number;
  series_name: string;
  url: string;
  photo: string;
  update: string;
  author: string;
  postNum: number;
}; // series 목록에서 필요한 series 정보

export type seriesDetail = {
  id: number;
  title: string;
  photo: string;
  update: string;
  author: string;
  postNum: number;
  postList: seriesPost[];
}; // 각 series별 페이지에서 필요한 series 정보 (series + seriesPost)

export type userDetail = {
  id: string;
  velog_name: string;
  email: string;
  username: string;
  userImg: string;
  description: string;
  github: string;
  twitter: string;
  facebook: string;
  homepage: string;
  mail: string;
  tags: string[];
  posts: post[];
  series: series[];
  about: string;
}; // '내 벨로그' 탭에서 필요한 user 정보

export type tag = {
  name: string;
  postCount: number;
};

export type mdElementType = {
  key: string;
  rank: number;
  content: string;
}; // 마크다운 heading 요소 타입, (프론트에서만 사용)

export enum presetBtn {
  h1 = 1,
  h2,
  h3,
  h4,
  bold,
  italic,
  strike,
  blockquote,
  link,
  image,
  codeblock,
} // 마크다운 프리셋 버튼 종류
