import express, { Request, Response, urlencoded } from "express";
import cors from "cors";
import cookieparser from "cookie-parser";
import {config} from "dotenv";
import createapi from "./routes/createapi.route";
import authapi from "./routes/userauth.route";
import message from "./routes/messages.api";
import conversations from "./routes/conversation.api";

config();
const port = process.env.PORT || 9000;
const app = express();
const httpserver = app.listen(port,()=>console.log(`app is running on port ${port}`))

app.use(express.json());
app.use(urlencoded({extended: true}));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use(cookieparser());

// routes

app.use("/auth-api",authapi);
app.use("/create-api",createapi);
app.use("/message-api",message);
app.use("/conversation-api",conversations);


// websocket

app.get('/',(req:Request,res:Response)=>{
    res.send("hello");
})