import { Request, Response, NextFunction } from 'express'
import axios from 'axios'
import { User } from '../../src/entity/User'

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const clientID = process.env.GOOGLE_CLIENT_ID;
        const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
        console.log(req)
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
                redirect_uri: "http://localhost:3000/",
        }
        })
        .then((response) => {
                const accessToken = response.data.access_token;
                console.log("accessToken:", response.data.access_token);
                return accessToken;
        })
        .then((token) => {
        axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json`, {
        headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
        const { data } = response;
                console.log(data); 
                User
        
        });
        })
}
        