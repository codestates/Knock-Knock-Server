import { Request, Response } from "express";

export default async (req: Request, res: Response): Promise<void> => {
  const { userid } = req.session;
  
  if (userid) {
    req.session.destroy(() => {
      res.status(200).send({message: "you are successfully signout"})
    })
  } else {
    res.status(404).send({message: "session userid is not found"})
  }

}