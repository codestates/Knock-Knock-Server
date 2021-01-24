const express = require("express");
const postsRouter = express.Router();

const { postsController } = require("../controller");

// 모든 포스트를 가져온다
postsRouter.get("/", postsController.getPostsAll);

//1개의 게시글(post)를 작성한다.
postsRouter.post("/", postsController.writingPost);

// 게시물 상태를 변경해서 닫는다. 
postsRouter.put("/:id", postsController.closingPost);

//히스토리 내 프로젝트를 삭제한다
postsRouter.delete("/", postsController.deletingHistory);

export default postsRouter;
