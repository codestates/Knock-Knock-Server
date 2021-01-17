const express = require("express");
const commentsRouter = express.Router();
// 컨트롤러 경로 가지고 오기
const { commentsController } = require("../controller");


//댓글을 가져온다
commentsRouter.get("/", commentsController.getComments);

//댓글을 작성한다.
commentsRouter.post("/", commentsController.postComments);

//댓글을 삭제한다.
//id는 comment_id를 의미한다.
commentsRouter.delete("/:id", commentsController.deleteComment);

export default commentsRouter;
