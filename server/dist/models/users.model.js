"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const db_1 = __importDefault(require("./db"));
(0, db_1.default)();
const userschema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
const usermodel = mongoose_1.default.model('user', userschema);
exports.default = usermodel;
