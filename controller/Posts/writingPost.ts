/** @format */
import {getConnection} from "typeorm";
import { Request, Response, NextFunction } from "express";
import { User } from "../../src/entity/User";
import { Post } from "../../src/entity/Post";

export default async (req: Request, res: Response): Promise<void> => {
    const {writer, category, title, content, backend, frontend, total, post_stacks} = req.body
    const {id} = req.params

    const newPost = await Post.writingPost(
    writer, 
    category, 
    title, 
    content, 
    backend, 
    frontend, 
    total, 
    post_stacks,
    )

    if (newPost) {
    await Post.JoinTheTable(newPost.identifiers[0].id, id);
    res.status(200).send({"message": "done"})
    }   
    else {
    res.status(404).send({ "message": "not found" })
    }
};


// "start": "nodemon --exec ts-node index.ts",
