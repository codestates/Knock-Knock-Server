/** @format */
import { Request, Response, NextFunction } from "express";
import { Diary } from "../../src/entity/Diary";

export default async (req: Request, res: Response): Promise<void> => {
  const { postid, userid } = req.body;
  console.log("왔냐?: " + req.session.userid);
  const diaryResult = await Diary.getDiary(postid, userid);

  // console.log(diaryResult);
  if (diaryResult) {
    res.status(200).send({ data: diaryResult });
  } else {
    res.status(404).send({ message: "diary not found!" });
  }
};
