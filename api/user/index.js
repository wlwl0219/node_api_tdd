const express = require("express");
const router = express.Router();
const ctrl = require("./user.ctrl");

// 요청 url에 대해 핸들러 함수를 연결한 라우팅
router.get("/", ctrl.index);

router.get("/:id", ctrl.show);

router.delete("/:id", ctrl.destroy);

router.post("/", ctrl.create);

module.exports = router;

// 라우팅을 설정하는 기능만 있다.
