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
const zod_1 = __importDefault(require("zod"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_model_1 = __importDefault(require("../models/users.model"));
(0, dotenv_1.config)();
const app = express_1.default.Router();
const key = process.env.KEY || "default_key";
const passwordschema = zod_1.default.object({
    username: zod_1.default.string().min(8),
    password: zod_1.default.string().min(8).regex(/[a-z]/).regex(/[A-Z]/).regex(/[0-9]/).regex(/[^a-zA-Z0-9]/)
});
const generate_token = (username, password, userid) => __awaiter(void 0, void 0, void 0, function* () {
    const token = yield jsonwebtoken_1.default.sign({ username, password, userid }, key);
    return token;
});
app.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const token = req.cookies.jwt;
        if (token) {
            const payload = jsonwebtoken_1.default.decode(token);
            if (payload.username === username && payload.password === password)
                throw new Error("user alrady exsits");
        }
        const isuser = yield users_model_1.default.findOne({ username });
        if (isuser)
            throw new Error('user alerady exists');
        else {
            const validcred = yield passwordschema.safeParse({ username, password });
            if (!validcred.success)
                throw new Error("password should have alteast one caps and one lower and a num and a special char and both the username and the password should be of lenth of 8");
            const newuser = yield users_model_1.default.create({ username, password });
            yield newuser.save();
            const newusertoken = yield generate_token(username, password, newuser._id);
            res.cookie('jwt', newusertoken, { httpOnly: true })
                .status(200)
                .json({ msg: newusertoken });
        }
    }
    catch (err) {
        res.status(400).json({ msg: `${err}` });
    }
}));
exports.default = app;
