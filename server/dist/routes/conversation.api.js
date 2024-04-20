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
const conversation_model_1 = __importDefault(require("../models/conversation.model"));
const express_1 = __importDefault(require("express"));
const app = express_1.default.Router();
app.post('/setconversation', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let senderid = req.body.senderid;
        let reciverid = req.body.reciverid;
        const exist = yield conversation_model_1.default.findOne({ members: { $all: [senderid, reciverid] } });
        if (exist)
            return res.status(200).json({ msg: "user already found" });
        else {
            const newconversation = yield conversation_model_1.default.create({ members: [senderid, reciverid] });
            yield newconversation.save();
            res.status(200).json({ msg: "new conversation added" });
        }
    }
    catch (err) {
        res.status(500).json({ msg: `${err}` });
    }
}));
app.get('/getconversation', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = yield conversation_model_1.default.findOne({ members: { $all: [req.body.senderid, req.body.reciverid] } });
        res.status(200).json({ msg: payload });
    }
    catch (err) {
        res.status(500).json({ msg: `${err}` });
    }
}));
exports.default = app;
