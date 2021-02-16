const express = require("express");
const app = express();

// 써드파티 미들웨어 install 추가 필요
const morgan = require("morgan");
const bodyParser = require("body-parser");

// 라우터 객체를 가져옴 (index은 생략가능)
const user = require("./api/user");

// 요청에 의한 응답 로그를 콘솔에 기록해 주는 미들웨어
app.use(morgan("dev"));

// json타입으로 body를 받을 수 있는 미들웨어
app.use(bodyParser.json());

// body를 인코딩 되게 설정
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/users", user);

module.exports = app;


// 서버를 구성하는 기능만 있다.