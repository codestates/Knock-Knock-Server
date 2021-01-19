/** @format */
import { Request, Response, NextFunction } from "express";
import { User } from "../../src/entity/User";
import { Post } from "../../src/entity/Post";


export default async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    
    const userData = await User.findById(id);
    const userPostData = await Post.getUserPost(id)

    if (userData) {
        console.log(userData)
        console.log(userPostData);

        res.status(200).send({userData : userData, postData: userPostData});
    } else {
        res.status(404).send({ "message": "user is not found" });
    }
}
