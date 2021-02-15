const express = require("express");
const app = express();
// 써드파티 미들웨어 install 추가 필요
const morgan = require("morgan");
const port = 3000;

// 요청에 의한 응답 로그를 콘솔에 기록해 주는 미들웨어
app.use(morgan("dev"));

// 요청 url에 대해 핸들러 함수를 작성한 라우팅
app.get("/", (req, res) => {
  // 응답 객체
  res.send("Hello World!");
});

// 요청 url에 대해 핸들러 함수를 작성한 라우팅
app.get("/users", (req, res) => {
  // 응답 객체
  res.json([{ name: "alice" }, { name: "bek" }]);
});

// 서버를 요청 대기 상태로 만듬
// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });

module.exports = app;
