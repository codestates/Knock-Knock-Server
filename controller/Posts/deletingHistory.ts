import { Request, Response, NextFunction } from "express";
import { Post } from "../../src/entity/Post";


// /history - body에 postid, userid
export default async (req: Request, res: Response): Promise<void> => {
  const { postid, userid } = req.body

  await Post.unjoinTheTable(postid, userid)
  const userPostResults = await Post.getUserPost(userid)
  
  if (userPostResults) {
		console.log(userPostResults);
		res.status(200).send({ msg: userPostResults });
	} else {
		res.status(404).send({ message: "Error" });
	}
}