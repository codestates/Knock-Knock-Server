/** @format */
import { Request, Response, NextFunction } from "express";
import { Post } from "../../src/entity/Post";

export default async (req: Request, res: Response): Promise<void> => {
  const { postid, userid, backend, frontend } = req.body;

  if(req.session.userid) {

  // 조인시켜준다.
  await Post.JoinTheTable(postid, userid);
  
  // 게시물을 가지고 온다
  const postResult = await Post.findById(postid);
    
  // 현재 게시물의 인원을 가지고 온다.
  const backNum = postResult.backend;
  const frontNum = postResult.frontend;

  // 클라이언트에서 보내준 인원을 빼서 다시 넣어준다.
  const modifyBack = backNum - backend;
  const modifyFront = frontNum - frontend;

  // 변경한 숫자를 데이터 베이스에 넣어준다.
  await Post.changeNum(postid, modifyBack, modifyFront);

  const postJoinResult = await Post.findById(postid);

  if (postJoinResult) {
    res.status(200).send({ data: postJoinResult });
  } else {
    res.status(404).send({ message: "join failed" });
  }
  }
};
