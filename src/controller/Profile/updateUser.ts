import { Request, Response, NextFunction } from "express";
import  User  from "../../entity/User";

export default async (req: Request, res: Response): Promise<void> => {
  const { username, persona, mood, user_stacks } = req.body;
  const { userid } = req.session;
  if (userid) {
    const postUserInfo = await User.updateUser(
      userid,
      username,
      persona,
      mood,
      user_stacks
    );

    if (postUserInfo) {
      const userData = await User.findById(userid);
      res.status(201).send({ data: userData });
    } else {
      res.status(404).send({ message: "user cannot be updated" });
    }
  } else {
    res.status(404).send({ message: "userid not found!" });
  }
};
