import express, { Express, Request, Response }  from 'express';
import { VideoItem } from './types';

const app: Express = express()
const port = process.env.PORT || 3000;

const videoItem: VideoItem = {
  id: 0,
  title: "string",
  author: "string",
  canBeDownloaded: true,
  minAgeRestriction: null,
  createdAt: "2024-04-01T17:14:43.869Z",
  publicationDate: "2024-04-01T17:14:43.869Z",
  availableResolutions: ['P144'],
}

const videoItems: VideoItem[] = [videoItem];

app.get('/videos', (req: Request, res: Response) => {
  res.send(videoItems);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})