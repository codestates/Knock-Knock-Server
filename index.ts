import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import "reflect-metadata";
import * as routes from "./routes";
import { createConnection } from "typeorm";
require("dotenv").config();
//  const nodeSchedule = require("node-schedule");

// 라우터 셋팅
const profileRouter = require("./routes/profile");
const postsRouter = require("./routes/posts");
const diaryRouter = require("./routes/diary");
// const commentsRouter = require("./routes/comments");
// const searchRouter = require("./routes/search");
// const joinRouter = require("./routes/join");
// const oauthRouter = require("./routes/oauth");

const app = express();
const port = 4000;

const options: cors.CorsOptions = {
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: true,
};

app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/profile", routes.profile);
app.use("/posts", routes.posts);
app.use("/diary", routes.diary);
// app.use("/comments", commentsRouter);
// app.use("/search", searchRouter);
app.use("/join", routes.join);
// app.use("/oauth", oauthRouter);

createConnection()
  .then(() => {
    console.log(`it's done!`);
  })
  .catch((error) => console.log(error));

app.listen(port, function () {
  console.log("You are knocking on the heaven from 4000!");
});

module.exports = app;
