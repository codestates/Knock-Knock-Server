 import { Request, Response, NextFunction } from "express";
import { Post } from "../../src/entity/Post";

export default async (req: Request, res: Response): Promise<void> => {
  const { postid, backend, frontend } = req.body;
  const { userid } = req.session;

  if (userid) {
    await Post.JoinTheTable(postid, userid);

    const postResult = await Post.findById(postid);

    const backNum = postResult.backend;
    const frontNum = postResult.frontend;

    const modifyBack = backNum - backend;
    const modifyFront = frontNum - frontend;

    if (modifyBack === 0 && modifyFront === 0) {
      await Post.makeClosed(postid);
      await Post.changeNum(postid, modifyBack, modifyFront);
      const closedResult = await Post.findById(postid);
      res.status(200).send({ data: closedResult });
    } else {
      await Post.changeNum(postid, modifyBack, modifyFront);
      const postJoinResult = await Post.findById(postid);

      if (postJoinResult) {
        res.status(200).send({ data: postJoinResult });
      } else {
        res.status(404).send({ message: "join failed" });
      }
    }
  }
};
