import express from "express";
import * as routes from "./routes";
import session from "express-session";

import cors from "cors";
import * as dotenv from "dotenv";
import { createConnection } from "typeorm";
dotenv.config();
//  const nodeSchedule = require("node-schedule");
// import "reflect-metadata";

const app = express();
const port = 4000;

app.use(
  session({
    proxy: true,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    rolling: true,
    cookie: {
      path: "/",
      sameSite: "none",
      httpOnly: true,
      maxAge: 60000 * 30, // 30분
      secure: true, //s 만 받으려면
    },
  })
);

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
app.use("/comments", routes.comments);
app.use("/search", routes.search);
app.use("/diary", routes.diary);
app.use("/join", routes.join);
// app.use("/oauth", oauthRouter);

// 데이터베이스 연결
createConnection()
  .then(() => {
    console.log(`it's done!`);
  })
  .catch((error) => console.log(error));

//
app.listen(port, function () {
  console.log("You are knocking on the heaven from 4000!");
});

module.exports = app;
