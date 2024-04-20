"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = require("dotenv");
const createapi_route_1 = __importDefault(require("./routes/createapi.route"));
const userauth_route_1 = __importDefault(require("./routes/userauth.route"));
const messages_api_1 = __importDefault(require("./routes/messages.api"));
const conversation_api_1 = __importDefault(require("./routes/conversation.api"));
(0, dotenv_1.config)();
const port = process.env.PORT || 9000;
const app = (0, express_1.default)();
const httpserver = app.listen(port, () => console.log(`app is running on port ${port}`));
app.use(express_1.default.json());
app.use((0, express_1.urlencoded)({ extended: true }));
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use((0, cookie_parser_1.default)());
// routes
app.use("/auth-api", userauth_route_1.default);
app.use("/create-api", createapi_route_1.default);
app.use("/message-api", messages_api_1.default);
app.use("/conversation-api", conversation_api_1.default);
// websocket
app.get('/', (req, res) => {
    res.send("hello");
});
