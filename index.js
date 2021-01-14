const express = require("express");
const cors = require("cors");
// const nodeSchedule = require("node-schedule");

const app = express();

const port = 4000;

app.use(
  cors({
    origin: "http://localhost:3000",
    method: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, function () {
  console.log("You are knocking on the heaven from 4000!");
});

module.exports = app;
