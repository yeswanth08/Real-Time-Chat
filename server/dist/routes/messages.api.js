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
const message_model_1 = __importDefault(require("../models/message.model"));
const conversation_model_1 = __importDefault(require("../models/conversation.model"));
const app = express_1.default.Router();
app.post('/setmessage', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newmessage = new message_model_1.default(req.body);
        yield newmessage.save();
        yield conversation_model_1.default.findByIdAndUpdate(req.body.conversationid, { messages: req.body.text });
        res.status(200).json({ msg: "message added" });
    }
    catch (err) {
        res.status(500).json({ msg: "something went wrong" });
    }
}));
app.get('/getmessage', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = yield message_model_1.default.find({ conversationid: req.params.id });
        res.status(200).json({ msg: payload });
    }
    catch (err) {
        res.status(500).json({ msg: `${err}` });
    }
}));
exports.default = app;
