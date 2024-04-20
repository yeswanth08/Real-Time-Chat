import express, { Response, Request } from "express";
import { Types } from "mongoose";
import { config } from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";
import usermodel from "../models/users.model";

config();
const app = express.Router();
const key = process.env.KEY || "default_key";

const generate_token = async (
  username: string,
  password: string,
  userid: Types.ObjectId
) => {
  const token = await jwt.sign({ username, password, userid }, key);
  return token;
};


app.post("/",async (req: Request, res: Response) => {
  try {
    const { username, password }: { username: string; password: string } = req.body;

    const token: string = req.cookies.jwt;
    if (token) {
      const payload = jwt.decode(token) as JwtPayload;
      if (payload.username === username && payload.password === password) throw new Error("user alrady exsits");
    }

    const isuser = await usermodel.findOne({username});
    if (isuser) throw new Error('user alerady exists');
    else{

    const newuser = await usermodel.create({ username, password });
    await newuser.save();

    const newusertoken = await generate_token(username, password, newuser._id);
    res
      .status(200)
      .json({ msg: newusertoken });
    }
  } catch (err) {
    res.status(201).json({ msg: `${err}` });
  }
});

export default app;
