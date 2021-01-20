import { Request, Response, NextFunction } from "express";
import { getComments } from ".";
import { Comment } from "../../src/entity/Comment";

export default async (req: Request, res: Response): Promise<void> => {

	const { postid } = req.body
	console.log(req.session.userid)
	if (req.session.userid) {
		
		const commentResult = await Comment.getComments(postid);

		if (commentResult) {
			console.log(commentResult);
			res.status(200).send({ data: commentResult });
		} else {
			res.status(404).send({ message: "getting comments failed" });
		}
	}
}