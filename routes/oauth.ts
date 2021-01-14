const express = require("express");
const oauthRouter = express.Router();

const { oauthController } = require("../controller");

oauthRouter.post("/", oauthController.post);

export default oauthRouter;
