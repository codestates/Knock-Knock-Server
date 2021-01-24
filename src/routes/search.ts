import * as express from "express";
const searchRouter = express.Router();
const { searchController } = require("../controller");

//그룹 현황을 조회(검색)한다.
searchRouter.get("/", searchController.search);

export default searchRouter;
