import * as express from "express";
const router = express.Router();
const { profileController } = require("../controller");

//최초로 유저의 프로필을 가져온다. 세션을 발행한다.
router.get("/:id", profileController.getUserInfo);

//발행된 세션으로 유저의 프로필을 가져온다.
router.get("/", profileController.getUserInfoWithSession);

//유저의 프로필을 수정한다.
router.post("/", profileController.updateUser);

export default router;