"use strict";
// high level --> conversation model
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const db_1 = __importDefault(require("./db"));
(0, db_1.default)();
const conversationschema = new mongoose_1.default.Schema({
    members: {
        type: Array,
    },
    messages: {
        types: String,
    }
}, {
    timestamps: true
});
const conversationmodel = mongoose_1.default.model('conversations', conversationschema);
exports.default = conversationmodel;
