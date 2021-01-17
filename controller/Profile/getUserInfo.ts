/** @format */
import { Request, Response, NextFunction } from "express";
import { User } from "../../src/entity/User";


export default async (req: Request, res: Response): Promise<void> => {
    
    const userData = await User.findById(req.params.id);
    if (userData) {
        console.log(userData)
        res.status(200).send(userData)
    } else {
        res.status(404).send({ "message": "user is not found" });
    }
}
