import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import {Server as WebSocketServer} from 'ws';
import createapi from './routes/createapi.route';
import authapi from './routes/userauth.route';
import parseapi from './routes/parse.token.route';

config();
const port = process.env.PORT || 9000;
const app = express();
const httpServer = app.listen(port, () => console.log(`App is running on port ${port}`));

const wss = new WebSocketServer({ server: httpServer });

wss.on('connection', (ws) => {
    console.log("WebSocket connected");

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });

    ws.on('message', (data,isBinary:false) => {
        wss.clients.forEach((client) => {
            client.send(data.toString('utf-8'));
        });
    });
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use(cookieParser());

app.use('/create-api', createapi);
app.use('/auth-api', authapi);
app.use('/parse-api', parseapi);
