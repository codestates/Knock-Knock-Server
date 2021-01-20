/** @format */

import { Request, Response, NextFunction } from "express";
import { User } from "../../src/entity/User";

export default async (req: Request, res: Response): Promise<void> => {
  const { username, persona, mood, user_stacks } = req.body;
  const { id } = req.params;
  if (req.session.userid) {
    const postUserInfo = await User.updateUser(
      id,
      username,
      persona,
      mood,
      user_stacks
    );

    if (postUserInfo) {
      const userData = await User.findById(req.params.id);
      res.status(201).send({ data: userData });
    } else {
      res.status(404).send({ message: "user cannot be updated" });
    }
  }
};
