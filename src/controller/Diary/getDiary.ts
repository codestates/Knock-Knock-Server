import { Request, Response, NextFunction } from "express";
import Diary from "../../entity/Diary";

export default async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { userid } = req.session;

  if (userid) {
    const diaryResult = await Diary.getDiary(id, userid);
    if (diaryResult) {
      res.status(200).send({ data: diaryResult });
    } else {
      res.status(404).send({ message: "diary not found!" });
    }
  } else {
    res.status(404).send({ message: "userid not found!" });
  }
};
