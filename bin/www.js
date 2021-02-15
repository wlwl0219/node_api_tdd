const app = require("../app");
const port = 3000;

// 서버를 요청 대기 상태로 만듬
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
