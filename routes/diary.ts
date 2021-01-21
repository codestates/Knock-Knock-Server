const express = require("express");
const diaryRouter = express.Router();
const { diaryController } = require("../controller");

//유저의 회고를 가져온다. req.params.id => post의 id
diaryRouter.get("/:id", diaryController.getDiary);

//유저의 회고를 등록한다.
diaryRouter.post("/", diaryController.writeDiary);

//유저의 회고를 삭제한다.
diaryRouter.delete("/", diaryController.deleteDiary);

export default diaryRouter;
