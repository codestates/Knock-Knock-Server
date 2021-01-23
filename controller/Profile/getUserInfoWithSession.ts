 import { Request, Response, NextFunction } from "express";
import { User } from "../../src/entity/User";
import { Post } from "../../src/entity/Post";

export default async (req: Request, res: Response): Promise<void> => {
  const { userid } = req.session;

  if (userid) {
    const userData = await User.findById(userid);
    const userPostData = await Post.getUserPost(userid);

    if (userData) {
      res.status(200).send({ userdata: userData, postdata: userPostData });
    } else {
      res.status(404).send({ message: "User not found."})
    }
  }
};