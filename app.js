const express = require("express");
const app = express();
// 써드파티 미들웨어 install 추가 필요
const morgan = require("morgan");
const bodyParser = require("body-parser");
// const port = 3000;
let users = [
  { id: 1, name: "alice" },
  { id: 2, name: "bek" },
  { id: 3, name: "wlwl" },
  { id: 4, name: "ajji" },
  { id: 5, name: "jieun" },
];

// 요청에 의한 응답 로그를 콘솔에 기록해 주는 미들웨어
// app.use(morgan("dev"));

// json타입으로 body를 받을 수 있는 미들웨어
app.use(bodyParser.json());

// body를 인코딩 되게 설정
app.use(bodyParser.urlencoded({ extended: true }));

// 요청 url에 대해 핸들러 함수를 작성한 라우팅
app.get("/", (req, res) => {
  // 응답 객체
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  req.query.limit = req.query.limit || 10;
  const limit = parseInt(req.query.limit, 10);
  if (Number.isNaN(limit)) {
    res.status(400).end();
  } else {
    res.json(users.slice(0, limit));
  }
});

app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const user = users.filter(user => user.id === id)[0];
  if (Number.isNaN(id)) {
    return res.status(400).end();
  } else if (!user) {
    return res.status(404).end();
  } else {
    return res.json(user);
  }
});

app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  users = users.filter(user => user.id !== id);
  if (Number.isNaN(id)) {
    return res.status(400).end();
  } else {
    return res.status(204).end();
  }
});

app.post("/users", (req, res) => {
  const name = req.body.name;
  const found = users.filter(user => user.name === name);
  const id = Date.now();
  const user = { id, name };
  console.log(user);
  if (!name) {
    return res.status(400).end();
  } else if (found) {
    return res.status(409).end();
  } else {
    users.push(user);
    return res.status(201).json(user);
  }
});

// 서버를 요청 대기 상태로 만듬
// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });

module.exports = app;
