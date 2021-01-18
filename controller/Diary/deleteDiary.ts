/** @format */
import { Request, Response, NextFunction } from "express";
import { Diary } from "../../src/entity/Diary";

export default async (req: Request, res: Response): Promise<void> => {
  const { diaryid, postid, userid } = req.body;

  const result = await Diary.deleteDiary(diaryid);
  const diaryResult = await Diary.getDiary(postid, userid);
  if (result) {
    res.status(200).send({ data: diaryResult });
  } else {
    res.status(404).send({ message: "delete diary failed" });
  }
};
