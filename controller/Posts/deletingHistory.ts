import { Request, Response, NextFunction } from "express";
import { Post } from "../../src/entity/Post";

export default async (req: Request, res: Response): Promise<void> => {
  const { postid } = req.body;
  const { userid } = req.session;

  if (userid) {
    await Post.unjoinTheTable(postid, userid);
    const userPostResults = await Post.getUserPost(userid);

    if (userPostResults) {
      res.status(200).send({ data: userPostResults });
    } else {
      res.status(404).send({ message: "delete failed" });
    }
  }
};
