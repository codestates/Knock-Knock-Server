import { Request, Response, NextFunction } from "express";
import axios from "axios";
import User from "../../entity/User";
import * as dotenv from "dotenv";
dotenv.config();

export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (req.body.authorizationCode.length === 73) {
    const clientID = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

    await axios({
      method: "POST",
      url: "https://accounts.google.com/o/oauth2/token",
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        client_id: clientID,
        client_secret: clientSecret,
        code: req.body.authorizationCode,
        grant_type: "authorization_code",
        redirect_uri: "https://localhost:3000/mngAccount",
      },
    })
      .then((response) => {
        const accessToken = response.data.access_token;
        return accessToken;
      })
      .then((token) => {
        axios({
          method: "GET",
          url: "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
          headers: { Authorization: `Bearer ${token}` },
        })
          .then(async (response) => {
            const { data } = response;
            const result = await User.findByEmail(data.email);

            if (result) {
              res.status(200).send({ data: result }); // 여기서 리다이렉션
            } else {
              await User.signup(data.email, data.name);
              const newResult = await User.findByEmail(data.email);
              res.status(201).send({ data: newResult }); // 여기서 리다이렉션
            }
          })
      });
  } else {
    //Github Oauth
    axios({
      method: "post",
      url: `https://github.com/login/oauth/access_token`,
      headers: {
        accept: "application/json",
      },
      data: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: req.body.authorizationCode,
      },
    }).then(async (response) => {
      const accessToken = response.data.access_token;
      let result = await axios({
        method: "GET",
        url: "https://api.github.com/user",
        headers: {
          authorization: `token ${accessToken}`,
        },
      }).then(async (response) => {
        const result = await User.findByEmail(response.data.node_id);
        if (result) {
          res.status(200).send({ data: result });
        } else {
          await User.signup(response.data.node_id, response.data.login);
          const newResult = await User.findByEmail(response.data.email);
          res.status(201).send({ data: newResult });
        }
      });
    });
  }
};
