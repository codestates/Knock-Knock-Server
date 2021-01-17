import { Request, Response, NextFunction } from "express";
import { User } from "../../src/entity/User";
import { Post } from "../../src/entity/Post";


export default async (req: Request, res: Response): Promise<void> => {
    const results = await Post.allPost();
    
    if (results) {
        res.status(200).send("ok")
        console.log(results)
    }
    else {
        res.status(404).send({"message" : ":p"})
    }
}