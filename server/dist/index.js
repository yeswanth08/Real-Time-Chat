"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = require("dotenv");
const ws_1 = require("ws");
const createapi_route_1 = __importDefault(require("./routes/createapi.route"));
const userauth_route_1 = __importDefault(require("./routes/userauth.route"));
const parse_token_route_1 = __importDefault(require("./routes/parse.token.route"));
(0, dotenv_1.config)();
const port = process.env.PORT || 9000;
const app = (0, express_1.default)();
const httpServer = app.listen(port, () => console.log(`App is running on port ${port}`));
const wss = new ws_1.Server({ server: httpServer });
wss.on('connection', (ws) => {
    console.log("WebSocket connected");
    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
    ws.on('message', (data, isBinary) => {
        wss.clients.forEach((client) => {
            client.send(data.toString('utf-8'));
        });
    });
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use((0, cookie_parser_1.default)());
app.use('/create-api', createapi_route_1.default);
app.use('/auth-api', userauth_route_1.default);
app.use('/parse-api', parse_token_route_1.default);
