import { Request, Response, NextFunction } from "express";
import { Comment } from "../../src/entity/Comment";

export default async (req: Request, res: Response): Promise<void> => { 

    const result = await Comment.deleteComment(req.params.id)
    const lists = await Comment.getComments(req.body.postid)

    if (result) {
        console.log(result);
        console.log(lists);
        res.status(200).send({ data: lists });
    } else {
        res.status(404).send({ message : "Comment not deleted"})
    }
}