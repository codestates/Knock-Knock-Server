/** @format */

import { Request, Response, NextFunction } from "express";
import { Post } from "../../src/entity/Post";
import { getConnection } from "typeorm";

export default async (req: Request, res: Response): Promise<void> => {
  const { title, total, category } = req.query;

  const searchResult = await getConnection()
    .createQueryBuilder()
    .select("post")
    .from(Post, "post")
    .where("post.total like :total", { total: `%${total}%` })
    .andWhere("post.category like :category", { category: `%${category}%` })
    .andWhere("post.title like :title", { title: `%${title}%` })
    .getMany();

  if (searchResult) {
    res.status(200).send({ data: searchResult });
  } else {
    res.status(404).send({ message: "post not found" });
  }
};
