const express = require("express");
const oauthRouter = express.Router();

const { oauthController } = require("../controller");

oauthRouter.post("/", oauthController.oauthLogin);

export default oauthRouter;
