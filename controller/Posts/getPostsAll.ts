import { Request, Response, NextFunction } from "express";
import { Post } from "../../src/entity/Post";

export default async (req: Request, res: Response): Promise<void> => {
  const { userid } = req.session;

  if (userid) {
    const postResult = await Post.allPost();

    if (postResult) {
      res.status(200).send({ data: postResult });
    } else {
      res.status(404).send({ message: "post not found" });
    }
  } else {
    res.status(404).send({ message: "userid not found!" });
  }
};
