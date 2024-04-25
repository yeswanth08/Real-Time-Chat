import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import { Server } from "socket.io";
import createapi from './routes/createapi.route';
import authapi from './routes/userauth.route';
import parseapi from './routes/parse.token.route';
import {createServer} from 'http';

config();
const port = process.env.PORT || 9000;
const app = express();
const httpServer = createServer(app);
httpServer.listen(port,()=>console.log(`server is running on the port ${port}`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

const io = new Server(httpServer,{
    cors:{
        origin: "http://localhost:5173"
    }
});

const connectionmap = new Map();


io.on('connection', (ws) => {
    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });

    ws.on('message',(data)=>{
        io.sockets.sockets.forEach((client) => {
            if (client.id !== ws.id) {
                client.send(data);
            }
        });
    })
    
});


app.use('/create-api', createapi);
app.use('/auth-api', authapi);
app.use('/parse-api', parseapi);


app.post('/chat-api',(req:Request,res:Response)=>{
    try{
        const {users} = req.body;
        const {user1,user2} = users;

        const hash = Number(user1)*Number(user2);

        console.log(hash);
        connectionmap.set(user1,hash);
        connectionmap.set(user2,hash);

        res.status(200).json({msg: 'connection established'});
    }catch(err){
        res.status(500).json({msg: `${err}`});
    }
})
