import { Request, Response, NextFunction } from "express";
import { Comment } from "../../src/entity/Comment";

export default async (req: Request, res: Response): Promise<void> => { 

    const {writer, comment, userid, postid } = req.body
    const results = await Comment.postComments(writer, comment)
    await Comment.joinUser(results.identifiers[0].id, userid);
    await Comment.joinPost(results.identifiers[0].id, postid);
    //const AComment = await Comment.findById(results.identifiers[0].id);
    const allComments = await Comment.getComments(postid)

    if (allComments) {
		console.log(allComments);
		res.status(200).send({ data: allComments });
	} else {
		res.status(404).send({ message: "posting failed" });
	}
}