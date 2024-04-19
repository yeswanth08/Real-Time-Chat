"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usermodel_1 = __importDefault(require("../models/usermodel"));
(0, dotenv_1.config)();
const app = express_1.default.Router();
const key = process.env.KEY || "default_key";
const generate_token = (username, password, userid) => __awaiter(void 0, void 0, void 0, function* () {
    const token = yield jsonwebtoken_1.default.sign({ username, password, userid }, key);
    return token;
});
app.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const token = req.cookies.jwt;
        if (token) {
            throw new Error("User already registered");
        }
        const newuser = yield usermodel_1.default.create({ username, password });
        yield newuser.save();
        const newusertoken = yield generate_token(username, password, newuser._id);
        const maxAgeMilliseconds = 30 * 24 * 60 * 60 * 1000;
        res
            .status(200)
            .cookie("jwt", newusertoken, {
            httpOnly: true,
            maxAge: maxAgeMilliseconds,
        })
            .json({ msg: "User created" });
    }
    catch (err) {
        res.status(404).json({ msg: `${err}` });
    }
}));
exports.default = app;
