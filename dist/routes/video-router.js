"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoItems = exports.videosRouter = void 0;
const express_1 = require("express");
const post_validation_1 = require("../utils/post-validation");
const put_validation_1 = require("../utils/put-validation");
exports.videosRouter = (0, express_1.Router)({});
const videoItem = {
    id: 0,
    title: "string",
    author: "string",
    canBeDownloaded: false,
    minAgeRestriction: null,
    createdAt: "2024-04-01T17:14:43.869Z",
    publicationDate: "2024-04-01T17:14:43.869Z",
    availableResolutions: ['P144'],
};
exports.videoItems = [videoItem];
exports.videosRouter.get('/', (req, res) => {
    res.send(exports.videoItems);
});
exports.videosRouter.get('/:id', (req, res) => {
    const id = +req.params.id;
    const item = exports.videoItems.find(item => item.id === id);
    if (!item && item !== 0) {
        res.send(404);
        return;
    }
    res.send(exports.videoItems[id]);
});
exports.videosRouter.post('/', (req, res) => {
    const { title, author, availableResolutions } = req.body;
    const checkRequest = (0, post_validation_1.postValidation)({ title, author, availableResolutions });
    if (!checkRequest.status) {
        res.status(400).send(checkRequest.objError);
        return;
    }
    const date = new Date();
    const publicationDate = new Date();
    publicationDate.setDate(publicationDate.getDate() + 1);
    const newVideo = {
        id: exports.videoItems.length,
        title,
        author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: date.toJSON(),
        publicationDate: publicationDate.toJSON(),
        availableResolutions,
    };
    exports.videoItems.push(newVideo);
    res.status(201).send(newVideo);
});
exports.videosRouter.put('/:id', (req, res) => {
    const id = +req.params.id;
    const item = exports.videoItems.find(item => item.id === id);
    if (!item && item !== 0) {
        res.send(404);
        return;
    }
    const { title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate } = req.body;
    const checkRequest = (0, put_validation_1.putValidation)({ title, author, availableResolutions, minAgeRestriction, canBeDownloaded, publicationDate });
    if (!checkRequest.status) {
        res.status(400).send(checkRequest.objError);
        return;
    }
    exports.videoItems[id].title = title;
    exports.videoItems[id].author = author;
    exports.videoItems[id].availableResolutions = availableResolutions;
    exports.videoItems[id].canBeDownloaded = canBeDownloaded;
    exports.videoItems[id].minAgeRestriction = minAgeRestriction;
    exports.videoItems[id].publicationDate = publicationDate;
    res.send(204);
});
exports.videosRouter.delete('/:id', (req, res) => {
    const id = +req.params.id;
    const item = exports.videoItems.find(item => item.id === id);
    if (!item && item !== 0) {
        res.send(404);
        return;
    }
    exports.videoItems.splice(id, 1);
    res.send(204);
});
