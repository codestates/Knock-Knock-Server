import { Request, Response, NextFunction } from "express";

export default async (req: Request, res: Response): Promise<void> => {
  const { userid } = req.session;

  console.log(userid)
  
  if (userid) {
    req.session.destroy(() => {
      res.status(200).send({message: "you are successfully signout"})
    })
  } else {
    res.status(404).send({message: "session userid is not found"})
  }

}