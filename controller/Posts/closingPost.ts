/** @format */

import { Request, Response, NextFunction } from "express";
import { User } from "../../src/entity/User";
import { Post } from "../../src/entity/Post";

export default async (req: Request, res: Response): Promise<void> => {
    // id: postid 
    const { open } = req.body
    const { id } = req.params
    const openStatus = await Post.openChange(id, open)
    // console.log(openStatus)

    const results = await Post.allPost();
    
    if (openStatus) {
        res.status(200).send({ "data" : results })
    } else {
        res.status(404).send("not found")
    }
};
