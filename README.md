# :waffle: team7-7elog-web

> **_team 7elog의 web repository입니다._**

<div align="center">
    <img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white"/>
    <img src="https://img.shields.io/badge/Sass-CC6699.svg?style=for-the-badge&logo=Sass&logoColor=white"/>
    <img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=for-the-badge&logo=ESLint&logoColor=white"/>
    <img src="https://img.shields.io/badge/Prettier-F7B93E.svg?style=for-the-badge&logo=Prettier&logoColor=black"/>
</div>

## :bulb: About the project: velog

[![image](https://user-images.githubusercontent.com/110763772/216703613-2c99599b-9ed5-4189-ab01-b0cdbb80682f.png)](https://velog.io/)

- 개발자들을 위한 블로그 서비스
  - web: [https://7elog.store](https://7elog.store/)
  - server : [https://api.7elog.store](https://api.7elog.store/)

## :technologist: 팀원 - frontend

|              Contributor              | Contribution  |
| :-----------------------------------: | :----------:  |
| [신호원](https://github.com/Howon-Shin) | AWS 배포, WRITE|
| [이영은](https://github.com/2-0-is)  |  SERIES, TAG   |
| [서도원](https://github.com/silky225) | LOGIN, SETTING |

## :hammer_and_wrench: 기술 스택

- library: React
- style: Sass + css modules
- language: typescript

## :clipboard: commit convention

- 프로젝트 생성 ⇒ :tada: Feat: ~~
- 기능 추가 ⇒ :sparkles: Feat: ~~
- 버그 수정 ⇒ :bug: Fix: ~~
- 디자인 변경 ⇒ :lipstick: Design: ~~
- 코드 포멧 변경 ⇒ :art: Style: ~~
- 코드 리펙토링 ⇒ :recycle: Refactor: ~~
- 문서 수정 ⇒ :memo: Docs: ~~
- 파일 및 폴더명 수정 ⇒ :truck: Rename: ~~

## :sparkles: Features
### 1. 로그인 페이지
- 이메일을 통해 인증한 계정을 사용한 로그인 방식과 구글 계정을 사용한 로그인 방식을 지원합니다.
<img width="777" alt="image" src="https://user-images.githubusercontent.com/110719049/216741949-71a999f0-48ff-476e-bdda-a4f9e68e9aa0.png">

### 2. 메인 페이지
- 인기 있는 포스트들과 최근에 작성된 포스트들을 확인할 수 있습니다. 
<img width="777" alt="image" src="https://user-images.githubusercontent.com/110719049/216742199-9763ce79-1181-4569-947c-b3470312c436.png">

### 3. 읽기 목록 페이지
- 내가 좋아요 한 포스트들과 최근 읽은 포스트들을 확인할 수 있습니다.
<img width="777" alt="image" src="https://user-images.githubusercontent.com/110719049/216744280-d58cea5b-394e-48b3-ba33-3dce53caf677.png">

### 4. 포스트 작성 페이지
- 텍스트 서식, 링크 삽입, 이미지 첨부, 태그 등의 기능을 사용하여 포스트를 작성할 수 있습니다.
<img width="777" alt="image" src="https://user-images.githubusercontent.com/110719049/216742231-ab430e1f-c99c-4ecd-a246-2a6918e5a21d.png">

### 5. 포스트 출간 페이지
- 출간할 포스트의 썸네일, 소개글, 공개 여부, URL, 시리즈 등을 설정할 수 있습니다.
<img width="777" alt="image" src="https://user-images.githubusercontent.com/110719049/216742261-5c9ad210-f4f1-4c55-af06-cc7268dfa69f.png">

### 6. 유저 페이지
  - 유저가 작성한 글, 시리즈를 조회하고 검색할 수 있습니다. 
<img width="777" alt="image" src="https://user-images.githubusercontent.com/110719049/216748580-55134246-451d-4d32-8fa4-ef2c55dd4a62.png">

### 7. 설정 페이지
  - 유저의 이름, 소개, 이미지, 소셜 계정 정보 등을 설정할 수 있습니다.  
<img width="777" alt="image" src="https://user-images.githubusercontent.com/110719049/216742356-a7117456-1a1b-400c-852a-6f83c64c52e9.png">

### 8. 태그 페이지
  - 태그들을 조회하고, 태그 별로 작성된 포스트들을 확인할 수 있습니다.  
<img width="777" alt="image" src="https://user-images.githubusercontent.com/110719049/216742379-64288705-297e-46e5-a86f-29213e368318.png">


---

### Pre-commit Guide

[Node.js](https://nodejs.org/en/)를 설치한 후, 실행이 가능합니다.

    npm install -g yarn
    yarn install
    yarn start
    
