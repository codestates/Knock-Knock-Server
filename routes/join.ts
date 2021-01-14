const express = require("express");
const joinRouter = express.Router();
const { joinController } = require("../controller");

//유저가 그룹에 참여한다.
joinRouter.post("/", joinController.joinGroup.post);

export default joinRouter;
