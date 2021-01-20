const express = require("express");
const postsRouter = express.Router();

const { postsController } = require("../controller");

// 모든 포스트를 가져온다
postsRouter.get("/", postsController.getPostsAll);

//1개의 게시글(post)를 작성하여 데이터베이스에 넣는다.
// id는 user_id를 의미한다.
postsRouter.post("/:id", postsController.writingPost);

// 1개의 post를 닫는다. 여기서 id는 post_id를 의미한다.
postsRouter.put("/:id", postsController.closingPost);

//히스토리내 프로젝트 삭제(body에는 postid, userid)
postsRouter.delete("/", postsController.deletingHistory);

export default postsRouter;
