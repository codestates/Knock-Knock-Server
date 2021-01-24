import { Request, Response, NextFunction } from "express";
import { Comment } from "../../entity/Comment";

export default async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { userid } = req.session;

  const commentResult = await Comment.getComments(id);

  if (commentResult) {
    res.status(200).send({ data: commentResult });
  } else {
    res.status(404).send({ message: "getting comments failed" });
  }
};
