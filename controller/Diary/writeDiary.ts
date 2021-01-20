/** @format */
import { Request, Response, NextFunction } from "express";
import { Diary } from "../../src/entity/Diary";

export default async (req: Request, res: Response): Promise<void> => {
  const { content, userid, postid } = req.body;

  if (req.session.userid) {
    const result = await Diary.writeDiary(content);
    const joinUserResult = await Diary.joinUser(result.identifiers[0].id, userid);
    const joinPostResult = await Diary.joinPost(result.identifiers[0].id, postid);

    const diaryResult = await Diary.getDiary(postid, userid);
    if (result) {
      res.status(200).send({ data: diaryResult });
    } else {
      res.status(404).send({ message: "diary not found!" });
    }
  }
};
