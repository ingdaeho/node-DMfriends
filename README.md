# 소셜 커머스 웹 사이트 개인 프로젝트(Back-end)

## 🖥 프로젝트 소개
Front-end로 참여했던 [팀 프로젝트](https://github.com/ingdaeho/15-1st-DMFriends-frontend) 결과물에 Node.js로 모델링부터 Back-end API를 비동기적으로 구현하였습니다. 

## 📅 개발 일정
- 개발 기간 : 2021. 01. 24 ~ 02.04 (12일간)
- 구성원 : 1인

## 📌 프로젝트 목적
- 비동기적 프로그래밍에 대한 이해도 향상
- 로직의 모듈화와 필요성에 대한 이해
- Back-end 분야에 대한 전반적인 지식 습득

## 🗒 프로젝트 요약
- Front 역할로 참여하였던 프로젝트를 이번에는 개인 프로젝트로 Express와 Prisma로 Back-end API를 구현해보았습니다. 
- 모델링부터 MVC Pattern으로 설계 및 모듈화, 에러 핸들링, API를 만드는 것까지 확장성을 생각하며 구현하였으며, 기존 프로젝트에서 미처 구현하지 못했던 기능까지 조금 더 많은 기능들을 구현해 보았습니다.

## 🚀 구현 기능
### Modeling
![](https://images.velog.io/images/ingdaeho/post/4f302422-9408-41e7-a55c-34387d510e4d/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202021-02-16%20%EC%98%A4%ED%9B%84%2012.10.07.png)


### Signup, Login
- env(환경 변수)를 활용한 token 암호화 및 발행
- express-validator를 이용한 ID, PW 유효성 검사

### Feed
- 유저는 댓글과 좋아요만 사용할 수 있는 Feed입니다. 댓글 추가 기능과 좋아요 기능까지 모두 구현하였습니다.

### Product
- where, include, select등 prisma 문법을 사용하였고, Front-end에서 어떻게 data를 받으면 좋을지에 대해 많이 고민하며 API를 만들었습니다.
- 제품 이미지 별로 type(ex. thumbnail, slider, detail)을 부여하여 필요한 이미지만 select하여 넘겨주었습니다.

### Cart
- 장바구니 추가, 수량 변경 기능 구현하였습니다.
- 선택된 제품만 req 받아서 Prisma의 `$transaction` 기능을 이용해 삭제되도록 구현하였습니다.

## 🛠Tech Stack
Node.js, Express, Prisma, MySQL

## 💰 소감 및 후기
### [회고록](https://velog.io/@ingdaeho/NodejsProject)
