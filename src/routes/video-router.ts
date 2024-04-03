import { Router, Request, Response } from 'express';
import { VideoItem } from '../types';
import { postValidation } from '../utils/post-validation';
import { putValidation } from '../utils/put-validation';


export const videosRouter = Router({});

const videoItem: VideoItem = {
    id: 0,
    title: "string",
    author: "string",
    canBeDownloaded: false,
    minAgeRestriction: null,
    createdAt: "2024-04-01T17:14:43.869Z",
    publicationDate: "2024-04-01T17:14:43.869Z",
    availableResolutions: ['P144'],
  }
  
export const videoItems: VideoItem[] = [videoItem];
  
videosRouter.get('/', (req: Request, res: Response) => {
  res.send(videoItems);
});

videosRouter.get('/:id', (req: Request, res: Response) => {
  const id = +req.params.id;
  const item = videoItems.find(item => item.id === id);

  if (!item && item !== 0) {
    res.send(404);
    return;
  }

  res.send(videoItems[id]);
});


videosRouter.post('/', (req: Request, res: Response) => {
  const { title, author, availableResolutions } = req.body;
  const checkRequest = postValidation({title, author, availableResolutions});

  if (!checkRequest.status) {
    res.status(400).send(checkRequest.objError);
    return;
  }

  const date = new Date();
  const publicationDate = new Date();
  publicationDate.setDate(publicationDate.getDate() + 1);

  const newVideo: VideoItem = {
    id: videoItems.length,
    title,
    author,
    canBeDownloaded: false,
    minAgeRestriction: null,
    createdAt: date.toJSON(),
    publicationDate: publicationDate.toJSON(),
    availableResolutions,
  };

  videoItems.push(newVideo);

  res.status(201).send(newVideo);  
});

videosRouter.put('/:id', (req: Request, res: Response) => {
  const id = +req.params.id;
  const item = videoItems.find(item => item.id === id);

  if (!item && item !== 0) {
    res.send(404);
    return;
  }

  const { title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate } = req.body;
  const checkRequest = putValidation({title, author, availableResolutions, minAgeRestriction, canBeDownloaded });

  if (!checkRequest.status) {
    res.status(400).send(checkRequest.objError);
    return;
  }

  videoItems[id].title = title;
  videoItems[id].author = author;
  videoItems[id].availableResolutions = availableResolutions;
  videoItems[id].canBeDownloaded = canBeDownloaded;
  videoItems[id].minAgeRestriction = minAgeRestriction;
  videoItems[id].publicationDate = publicationDate;

  res.send(204)
})

videosRouter.delete('/:id', (req: Request, res: Response) => {
  const id = +req.params.id;
  const item = videoItems.find(item => item.id === id);

  if (!item && item !== 0) {
    res.send(404);
    return;
  }

  videoItems.splice(id, 1);

  res.send(204);
});