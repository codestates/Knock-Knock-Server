/** @format */

import { Request, Response, NextFunction } from "express";
import { User } from "../../src/entity/User";
import { Post } from "../../src/entity/Post";

export default async (req: Request, res: Response): Promise<void> => {
  // id: postid
  const { open } = req.body;
  const { id } = req.params;

  if (req.session.userid) {
    const openStatus = await Post.openChange(id, open);
    const postResult = await Post.allPost();
  
    if (openStatus) {
      res.status(200).send({ data: postResult });
    } else {
      res.status(404).send({ message: "closed failed" });
    }
  }
};
