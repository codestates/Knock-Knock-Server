import express from "express";
import * as routes from "./routes";
import session = require("express-session");
import * as bodyParser from "body-parser";
import cookieParser from "cookie-parser";

// const fs = require("fs");
// const http = require("http");
// const https = require("https");

// const privateKey = fs.readFileSync("./key.pem", "utf8");
// const certificate = fs.readFileSync("./cert.pem", "utf8");
// const credentials = { key: privateKey, cert: certificate };

// const mysqlStore = require("express-mysql-session")(session);
// const optionsForStorage = {
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// };

const app = express();
const port = 4000;
app.use(cookieParser());
app.use(bodyParser.json());

// var httpServer = http.createServer(app);
// var httpsServer = https.createServer(credentials, app);
// httpServer.listen(8080);
// httpsServer.listen(port);

import cors from "cors";
import { createConnection } from "typeorm";
import * as dotenv from "dotenv";
dotenv.config();
//  const nodeSchedule = require("node-schedule");
// import "reflect-metadata";
// const sessionStorage = new mysqlStore(optionsForStorage);

app.set("trust proxy", 1);
app.use(
  session({
    // proxy: true,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    // store: sessionStorage,
    cookie: {
      path: "/",
      // sameSite: "none",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      // secure: true,
    },
  })
);

const options: cors.CorsOptions = {
  origin: true,
  credentials: true,
  methods: ["GET,POST"],
};

app.use(cors(options));
app.use(
  session({
    proxy: true,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      maxAge: 24 * 6 * 60 * 10000,
    },
  })
);

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

app.listen(port, function () {
  console.log("You are knocking on the heaven from 4000!");
});

module.exports = app;
