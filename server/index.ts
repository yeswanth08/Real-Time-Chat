import express, { urlencoded, json } from "express";
import cors from "cors";
import cookieparser from "cookie-parser";
import { config } from "dotenv";
import { createServer } from 'http'; 
import { Server, Socket } from 'socket.io';

config();
const port = process.env.PORT || 9000;
const app = express();
const httpserver = createServer(app); 
const io = new Server(httpserver, { 
    cors: {
        origin: 'http://localhost:3000',
    },
});

app.use(json()); 
app.use(urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use(cookieparser());


// WebSocket 
let users: { sub: string; socketId: string }[] = [];

const addUser = (userData: { sub: string }, socketId: string) => {
    !users.some(user => user.sub === userData.sub) && users.push({ ...userData, socketId });
}

const removeUser = (socketId: string) => {
    users = users.filter(user => user.socketId !== socketId);
}

const getUser = (userId: string) => {
    return users.find(user => user.sub === userId);
}

io.on('connection', (socket: Socket) => {
    console.log('user connected');

    // Connect
    socket.on("addUser", (userData: { sub: string }) => {
        addUser(userData, socket.id);
        io.emit("getUsers", users);
    });

    // Send message
    socket.on('sendMessage', (data: { receiverId: string }) => {
        const user = getUser(data.receiverId);
        if (user) {
            io.to(user.socketId).emit('getMessage', data);
        }
    });

    // Disconnect
    socket.on('disconnect', () => {
        console.log('user disconnected');
        removeUser(socket.id);
        io.emit('getUsers', users);
    });
});

httpserver.listen(port, () => console.log(`app is running on port ${port}`));
