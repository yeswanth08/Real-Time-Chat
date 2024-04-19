"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userauth_route_1 = __importDefault(require("./routes/userauth.route"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const createapi_route_1 = __importDefault(require("./routes/createapi.route"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const port = process.env.PORT || 9000;
const app = (0, express_1.default)();
const httpserver = app.listen(port, () => console.log(`app is running on port ${port}`));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
// routes
app.use("/auth-api", userauth_route_1.default);
app.use("/create-api", createapi_route_1.default);
