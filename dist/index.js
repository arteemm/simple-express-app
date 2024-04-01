"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const videoItem = {
    id: 0,
    title: "string",
    author: "string",
    canBeDownloaded: true,
    minAgeRestriction: null,
    createdAt: "2024-04-01T17:14:43.869Z",
    publicationDate: "2024-04-01T17:14:43.869Z",
    availableResolutions: ['P144'],
};
const videoItems = [videoItem];
const parserMiddleware = (0, body_parser_1.default)();
app.use(parserMiddleware);
app.get('/', (req, res) => {
    res.send(videoItems);
});
app.get('/:videos', (req, res) => {
    const uri = req.params.videos;
    if (uri === 'videos') {
        res.send(videoItems);
        return;
    }
    res.send(404);
});
app.post('/videos', (req, res) => {
    const { title, author, availableResolutions } = req.body;
    if (!title || !author || !availableResolutions.length) {
        const message = {
            errorsMessages: [
                {
                    message: "string",
                    field: "string"
                }
            ]
        };
        res.status(400).send(message);
        return;
    }
    const newVideo = {
        id: videoItems.length,
        title,
        author,
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: '1',
        publicationDate: '2',
        availableResolutions,
    };
    videoItems.push(newVideo);
    res.status(201).send(newVideo);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
