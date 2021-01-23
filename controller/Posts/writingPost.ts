import { Request, Response, NextFunction } from "express";
import { Post } from "../../src/entity/Post";

export default async (req: Request, res: Response): Promise<void> => {
  const {
    writer,
    category,
    title,
    content,
    backend,
    frontend,
    total,
    post_stacks,
  } = req.body;
  const { userid } = req.session;

  if (userid) {
    const newPost = await Post.writingPost(
      writer,
      category,
      title,
      content,
      backend,
      frontend,
      total,
      post_stacks
    );
    const postResult = await Post.allPost();

    if (newPost) {
      await Post.JoinTheTable(newPost.identifiers[0].id, userid);
      res.status(200).send({ data: postResult });
    } else {
      res.status(404).send({ message: "post failed" });
    }
  } else {
    res.status(404).send({ message: "userid not found!" });
  }
};
