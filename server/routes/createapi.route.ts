import express, { Response, Request } from "express";
import { Types } from "mongoose";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import usermodel from "../models/usermodel";

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

app.post("/", async (req: Request, res: Response) => {
  try {
    const { username, password }: { username: string; password: string } =
      req.body;

    const token: string = req.cookies.jwt;
    if (token) {
      throw new Error("User already registered");
    }
    const newuser = await usermodel.create({ username, password });
    await newuser.save();

    const newusertoken = await generate_token(username, password, newuser._id);
    const maxAgeMilliseconds = 30 * 24 * 60 * 60 * 1000;
    res
      .status(200)
      .cookie("jwt", newusertoken, {
        httpOnly: true,
        maxAge: maxAgeMilliseconds,
      })
      .json({ msg: "User created" });
  } catch (err) {
    res.status(404).json({ msg: `${err}` });
  }
});

export default app;
