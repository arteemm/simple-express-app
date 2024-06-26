"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const video_router_1 = require("./routes/video-router");
const testing_all_data_1 = require("./routes/testing-all-data");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const parserMiddleware = (0, body_parser_1.default)();
app.use(parserMiddleware);
app.use('/videos', video_router_1.videosRouter);
app.use('/testing', testing_all_data_1.testingRouter);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
