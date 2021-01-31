import { Request, Response } from "express";
import Post from "../../entity/Post";
import User from "../../entity/User";

export default async (req: Request, res: Response): Promise<void> => {
  const { postid } = req.body;
  const { userid } = req.session;

  if (userid) {
    const currentPost = await Post.findById(postid);
    const currentUser = await User.findById(userid)

    if (currentUser.username.includes(currentPost.writer.split(" ")[1])) { 
			await Post.makeClosed(postid);
			const ResultsAfterClosing = await Post.getUserPost(userid);
      res.status(200).send({ data: ResultsAfterClosing });
      
		} else {
			await Post.unjoinTheTable(postid, userid);
			const ResultsAfterUnjoining = await Post.getUserPost(userid);

			if (ResultsAfterUnjoining) {
				res.status(200).send({ data: ResultsAfterUnjoining });
			} else {
				res.status(404).send({ message: "delete failed" });
			}
		}
      
  } else {
    res.status(404).send({ message: "userid not found!" });
  }

};
