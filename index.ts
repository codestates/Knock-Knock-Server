import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import session = require("express-session");
import { createConnection } from "typeorm";
import { Post } from "./src/entity/Post";

import * as dotenv from "dotenv";
import * as routes from "./src/routes";
import * as bodyParser from "body-parser";

dotenv.config();

const fs = require("fs");
const https = require("https");
const nodeSchedule = require("node-schedule");
const privateKey = fs.readFileSync("./key.pem", "utf8");
const certificate = fs.readFileSync("./cert.pem", "utf8");
const credentials = { key: privateKey, cert: certificate };

const port = 4000;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

// cors option 및 cors설정
const options: cors.CorsOptions = {
  origin: true,
  credentials: true,
  methods: ["GET,POST,OPTIONS,PUT,DELETE"],
};

app.use(cors(options));

// session 설정
app.use(
  session({
    proxy: true,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true,
      httpOnly: true,
      maxAge: 24 * 6 * 60 * 10000,
    },
  })
);

// 라우터
app.use("/profile", routes.profile);
app.use("/posts", routes.posts);
app.use("/comments", routes.comments);
app.use("/search", routes.search);
app.use("/diary", routes.diary);
app.use("/join", routes.join);
app.use("/oauth", routes.oauth);

// 데이터베이스 연결
createConnection()
  .then(() => {
    console.log(`it's done!`);
  })
  .catch((error) => console.log(error));

const postClosedSchedule = nodeSchedule.scheduleJob(
  "* * */24 * * *",
  async () => {
    // mysql에서 모든 게시물을 다 가지고 온다.
    const postResult = await Post.allPost();
    // 현재시간을 가지고 온다.
    let filterdPost = await postResult.map((post) => {
      let currentTime = new Date().getTime();
      let postCreatedAt = new Date(post.created_at).getTime();
      let dateDiff = Math.floor(
        (currentTime - postCreatedAt) / (1000 * 3600 * 24)
      );
      if (dateDiff >= 7) {
        return post.id;
      }
    });
    filterdPost.forEach((id) => {
      if (id) {
        Post.makeClosed(id);
      }
    });
    // 게시물이 만들어진 시간을 가지고온다.
    // 현재시간 - 생성된 시간 = 7일이라는 시간이 지난다
    // 그러면 우리는 open => false변경을 한다.
  }
);

const httpsServer = https.createServer(credentials, app);
httpsServer.listen(port);

module.exports = httpsServer;
