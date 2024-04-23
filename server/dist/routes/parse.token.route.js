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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = __importDefault(require("express"));
const app = express_1.default.Router();
app.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.body;
        console.log(token);
        if (!token) {
            return res.status(401).json({ msg: "No token found" });
        }
        const payload = jsonwebtoken_1.default.decode(token);
        if (!payload) {
            return res.status(401).json({ msg: "Invalid token" });
        }
        console.log(payload);
        res.status(200).json({ msg: payload });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Error parsing token" });
    }
}));
exports.default = app;
