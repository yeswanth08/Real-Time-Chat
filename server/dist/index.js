"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = require("dotenv");
const socket_io_1 = require("socket.io");
const createapi_route_1 = __importDefault(require("./routes/createapi.route"));
const userauth_route_1 = __importDefault(require("./routes/userauth.route"));
const parse_token_route_1 = __importDefault(require("./routes/parse.token.route"));
const http_1 = require("http");
(0, dotenv_1.config)();
const port = process.env.PORT || 9000;
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
httpServer.listen(port, () => console.log(`server is running on the port ${port}`));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true
}));
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "http://localhost:5173"
    }
});
const connectionmap = new Map();
io.on('connection', (ws) => {
    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
    ws.on('message', (data) => {
        io.sockets.sockets.forEach((client) => {
            if (client.id !== ws.id) {
                client.send(data);
            }
        });
    });
});
app.use('/create-api', createapi_route_1.default);
app.use('/auth-api', userauth_route_1.default);
app.use('/parse-api', parse_token_route_1.default);
app.post('/chat-api', (req, res) => {
    try {
        const { users } = req.body;
        const { user1, user2 } = users;
        const hash = Number(user1) * Number(user2);
        console.log(hash);
        connectionmap.set(user1, hash);
        connectionmap.set(user2, hash);
        res.status(200).json({ msg: 'connection established' });
    }
    catch (err) {
        res.status(500).json({ msg: `${err}` });
    }
});
