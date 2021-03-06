import { Request, Response } from "express";
import Post from "../../entity/Post";

export default async (req: Request, res: Response): Promise<void> => {
  const { userid } = req.session;

  const postResult = await Post.allPost();

  if (postResult) {
    res.status(200).send({ data: postResult });
  } else {
    res.status(404).send({ message: "post not found" });
  }
};
