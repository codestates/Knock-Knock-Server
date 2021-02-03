import { Request, Response, NextFunction } from "express";
import Post from "../../entity/Post";

export default async (req: Request, res: Response): Promise<void> => {
  const { postid, backend, frontend, category } = req.body;
  const { userid } = req.session;

  // userid가 있을때 모든 로직은 시작된다.
  if (userid) {
    try {
      await Post.JoinTheTable(postid, userid);
    } catch (err) {
      res.send({ message: "userid, postid in the joinTable" });
    }
    // 신청하는 해당 게시물을 가지고 온다.
    const postResult = await Post.findById(postid);
    // 프로젝트의 경우에는 지원 포지션 인원을 받게 된다.
    if (category === "Project") {
      // 최초 지원 가능한 인원수를 불러온다.
      const backNum = postResult.backend;
      const frontNum = postResult.frontend;
      // 지원 가능한 인원수에 신청한 포지션의 인원(1명)을 뺸다.
      const modifyBack = backNum - backend;
      const modifyFront = frontNum - frontend;
      // 지원 가능한 인원이 다찼을 경우에는 open의 상태를 false로 변경
      if (modifyBack <= 0 && modifyFront <= 0) {
        await Post.changeNum(postid, modifyBack, modifyFront);
        await Post.makeClosed(postid);
        const closedResult = await Post.findById(postid);
        res.status(200).send({ data: closedResult });
      } else {
        // 지원 가능한 인원이 다 차지 않은 경우에는 인원수 변경만 한다.
        await Post.changeNum(postid, modifyBack, modifyFront);
        const openResult = await Post.findById(postid);
        res.status(200).send({ data: openResult });
      }
    } else if (category === "Study") {
      // 카테고리가 스터디인 경우에는 전체 신청 가능 인원수에서 1명을 뺀다.
      const totalNum = postResult.total;
      const modifyTotal = totalNum - 1;

      // 0보다 작으면, open 상태를 false로 변경한다.
      if (modifyTotal <= 0) {
        await Post.changeTotal(postid, modifyTotal);
        await Post.makeClosed(postid);
        const closedStudyResult = await Post.findById(postid);
        res.status(200).send({ data: closedStudyResult });
      } else {
        await Post.changeTotal(postid, modifyTotal);
        const studyResult = await Post.findById(postid);
        res.status(200).send({ data: studyResult });
      }
    }
  } else {
    res.status(404).send({ message: "userid not found!" });
  }
};
