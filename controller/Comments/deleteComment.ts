import { Request, Response, NextFunction } from "express";
import { Comment } from "../../src/entity/Comment";
import { User } from "../../src/entity/User";

export default async (req: Request, res: Response): Promise<void> => {
  const { commentid, postid } = req.body;
  const { userid } = req.session;

  if (userid) {
    const validation = await User.findById(userid);
    const aResult = await Comment.getAComment(commentid);

    if (validation.username === aResult.writer) {
      const result = await Comment.deleteComment(commentid);
      const lists = await Comment.getComments(postid);

      if (result) {
        res.status(200).send({ data: lists });
      } else {
        res.status(404).send({ message: "Comment not deleted" });
      }
    } else {
      res.status(404).send({ message: "it's not allowed to you" });
    }
  }
};
