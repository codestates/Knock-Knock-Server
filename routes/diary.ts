const express = require("express");
const diaryRouter = express.Router();
const { diaryController } = require("../controller");

//유저의 회고를 가져온다.
diaryRouter.get("/:id", diaryController.getDiary.get);

//유저의 회고를 등록한다.
diaryRouter.post("/", diaryController.postDiary.post);

export default diaryRouter;
