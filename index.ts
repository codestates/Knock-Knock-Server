import express from "express";
import * as routes from "./routes";
import session from "express-session";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";

const fs = require("fs");
const http = require("http");
const https = require("https");

const privateKey = fs.readFileSync("./key.pem", "utf8");
const certificate = fs.readFileSync("./cert.pem", "utf8");
const credentials = { key: privateKey, cert: certificate };

const app = express();
const port = 4000;
// app.use(cookieParser());
app.use(bodyParser.json());

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
httpServer.listen(8080);
httpsServer.listen(port);

import cors from "cors";
import { createConnection } from "typeorm";
import * as dotenv from "dotenv";
dotenv.config();
//  const nodeSchedule = require("node-schedule");
// import "reflect-metadata";

app.use(
  session({
    proxy: true,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      sameSite: "none",
      httpOnly: true,
      maxAge: 60000 * 30,
      secure: true,
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
app.use("/oauth", routes.oauth);

// 데이터베이스 연결
createConnection()
  .then(() => {
    console.log(`it's done!`);
  })
  .catch((error) => console.log(error));

//
// app.listen(port, function () {
//   console.log("You are knocking on the heaven from 4000!");
// });

module.exports = app;
