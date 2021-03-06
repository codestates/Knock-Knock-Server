import { Request, Response } from "express";
import Comment from "../../entity/Comment";

export default async (req: Request, res: Response): Promise<void> => {
  const { writer, comment, postid } = req.body;
  const { userid } = req.session;

  if (userid) {
    const results = await Comment.postComments(writer, comment);

    await Comment.joinUser(results.identifiers[0].id, userid);
    await Comment.joinPost(results.identifiers[0].id, postid);

    const allComments = await Comment.getComments(postid);
    if (allComments) {
      res.status(200).send({ data: allComments });
    } else {
      res.status(404).send({ message: "posting failed" });
    }
  } else {
    res.status(404).send({ message: "userid not found!" });
  }
};
