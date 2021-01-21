import * as express from "express";
const router = express.Router();
const { profileController } = require("../controller");
//유저의 프로필을 가져온다.
router.get("/:id", profileController.getUserInfo);

//유저의 프로필을 수정한다.
router.post("/", profileController.updateUser);

export default router;
