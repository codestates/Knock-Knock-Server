/** @format */
import { Request, Response, NextFunction } from "express";
import { Diary } from "../../src/entity/Diary";
import { getConnection } from "typeorm";

export default async (req: Request, res: Response): Promise<void> => {
  const { postid, userid } = req.body;

  const diaryResult = await Diary.getDiary(postid, userid);

  console.log(diaryResult);
  if (diaryResult) {
    res.status(200).send({ data: diaryResult });
  } else {
    res.status(404).send({ message: "diary not found!" });
  }
};
