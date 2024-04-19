import express from "express";
import cors from "cors";
import authapi from "./routes/userauth.route";
import cookieparser from "cookie-parser";
import createapi from "./routes/createapi.route";
import {config} from "dotenv";


config();
const port = process.env.PORT || 9000;
const app = express();
const httpserver = app.listen(port,()=>console.log(`app is running on port ${port}`))

app.use(express.json());
app.use(cors());
app.use(cookieparser());

// routes

app.use("/auth-api",authapi);
app.use("/create-api",createapi);
