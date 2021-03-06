import { Request, Response } from "express";
import User from "../../entity/User";
import Post from "../../entity/Post";

export default async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const userData = await User.findById(id);
  const userPostData = await Post.getUserPost(id);

  if (userData) {
    if (!req.session.userid) {
      req.session.save(() => {
        req.session.userid = userData.id;
        res.status(200).send({ userData: userData, postData: userPostData });
      });
    } else {
      res.status(200).send({ userData: userData, postData: userPostData });
    }
  } else {
    res.status(404).send({ message: "user is not found" });
  }
};
