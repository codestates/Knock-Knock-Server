const express = require("express");
const commentsRouter = express.Router();
const { commentsController } = require("../controller");

//댓글을 가져온다
commentsRouter.get("/:id", commentsController.getComments);

//댓글을 작성한다.
commentsRouter.post("/", commentsController.postComments);

//댓글을 삭제한다.
commentsRouter.delete("/", commentsController.deleteComment);

export default commentsRouter;
