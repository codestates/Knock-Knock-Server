const express = require("express");
const diaryRouter = express.Router();
const { diaryController } = require("../controller");

// //유저의 회고를 가져온다.
diaryRouter.get("/", diaryController.getDiary);

// //유저의 회고를 등록한다.
diaryRouter.post("/", diaryController.writeDiary);

export default diaryRouter;
