import jwt from 'jsonwebtoken';
import express, { Request, Response } from "express";

const app = express.Router();

app.post('/', async (req: Request, res: Response) => {
    try {
        const {token} = req.body;
        if (!token) {
            return res.status(401).json({ msg: "No token found" });
        }

        const payload = jwt.decode(token);
        if (!payload) {
            return res.status(401).json({ msg: "Invalid token" });
        }
        res.status(200).json({ msg: payload });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Error parsing token" });
    }
});

export default app;
