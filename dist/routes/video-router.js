"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosRouter = void 0;
const express_1 = require("express");
const post_validation_1 = require("../utils/post-validation");
exports.videosRouter = (0, express_1.Router)({});
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
exports.videosRouter.get('/', (req, res) => {
    res.send(videoItems);
});
exports.videosRouter.get('/:id', (req, res) => {
    const id = +req.params.id;
    const item = videoItems.find(item => item.id === id);
    if (!item && item !== 0) {
        res.send(404);
        return;
    }
    res.send(videoItems[id]);
});
exports.videosRouter.post('/', (req, res) => {
    const { title, author, availableResolutions } = req.body;
    const checkRequest = (0, post_validation_1.postValidation)({ title, author, availableResolutions });
    if (!checkRequest.status) {
        const message = {
            errorsMessages: [
                {
                    message: checkRequest.message,
                    field: checkRequest.field,
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
exports.videosRouter.put('/:id', (req, res) => {
    const id = +req.params.id;
    const item = videoItems.find(item => item.id === id);
    if (!item && item !== 0) {
        res.send(404);
        return;
    }
    const { title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate } = req.body;
    if (!title || !author || !availableResolutions.length || !minAgeRestriction || !publicationDate || !canBeDownloaded) {
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
    videoItems[id].title = title;
    videoItems[id].author = author;
    videoItems[id].availableResolutions = availableResolutions;
    videoItems[id].canBeDownloaded = canBeDownloaded;
    videoItems[id].minAgeRestriction = minAgeRestriction;
    videoItems[id].publicationDate = publicationDate;
    res.send(204);
});
exports.videosRouter.delete('/:id', (req, res) => {
    const id = +req.params.id;
    const item = videoItems.find(item => item.id === id);
    if (!item && item !== 0) {
        res.send(404);
        return;
    }
    videoItems.splice(id, 1);
    res.send(204);
});
exports.videosRouter.delete('/', (req, res) => {
    videoItems.length = 0;
    res.send(204);
});
