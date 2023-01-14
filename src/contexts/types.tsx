import React from 'react';

export type user = {
  id: string;
  velog_name: string;
  username: string;
  userImg: string;
  description: string;
  github: string;
  twitter: string;
  facebook: string;
  homepage: string;
  mail: string;
}; // user의 rough 정보

export type post = {
  id: number;
  title: string;
  author: user;
  url: string;
  preview: string;
  thumbnail: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  comments: number;
  likes: number;
  is_private: boolean;
}; // component를 위한 post 정보

export interface commentType {
  content: string;
  // eslint-disable-next-line no-use-before-define
  children?: commentListType;
}
export interface commentListType {
  comments: commentType[];
  length: number;
}

export type post_detail = {
  id: number;
  title: string;
  author: user;
  url: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  prev_post: post;
  next_post: post;
  comments: commentListType;
  likes: number;
  is_private: boolean;
}; // post별 page에서 필요한 post 정보

export type seriesPost = {
  series_id: number;
  post: post;
}; // 각 series별 page에서 필요한 post 정보

export type series = {
  id: number;
  title: string;
  photo: string;
  update: string;
  authorId: string;
  postNum: number;
}; // series 목록에서 필요한 series 정보

export type series_detail = {
  id: number;
  title: string;
  photo: string;
  update: string;
  authorId: string;
  postNum: number;
  postList: seriesPost[];
}; // 각 series별 페이지에서 필요한 series 정보 (series + seriesPost)

export type user_detail = {
  id: string;
  velog_name: string;
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
