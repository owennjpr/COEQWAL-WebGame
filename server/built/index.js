"use strict";
// import app from "./server";
// import { createServer } from "http";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const server_1 = __importDefault(require("./server"));
function handler(req, res) {
    return (0, server_1.default)(req, res);
}
