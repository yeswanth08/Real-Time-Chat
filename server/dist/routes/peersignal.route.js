"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default.Router();
const signalStore = {};
app.post('/', (req, res) => {
    const { signal } = req.body;
    const peerId = Math.random().toString(36).substring(7);
    signalStore[peerId] = signal;
    res.json({ peerId });
});
app.get('/:peerId', (req, res) => {
    const { peerId } = req.params;
    const signal = signalStore[peerId];
    if (!signal) {
        return res.status(404).json({ error: 'Peer signal not found' });
    }
    res.json({ signal });
});
exports.default = app;
