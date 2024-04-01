import express, { Express, Request, Response }  from 'express';
import bodyParser from 'body-parser';
import { VideoItem, RequestBody } from './types';

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

const parserMiddleware = bodyParser();
app.use(parserMiddleware)

app.get('/', (req: Request, res: Response) => {
  res.send(videoItems);
});

app.get('/:videos', (req: Request, res: Response) => {
  const uri = req.params.videos;
  if (uri === 'videos') {
    res.send(videoItems);
    return;
  }

  res.send(404);
});


app.post('/videos', (req: Request, res: Response) => {
  const { title, author, availableResolutions } = req.body;

  if (!title || !author || !availableResolutions.length) {
    const message = {
      errorsMessages: [
        {
          message: "string",
          field: "string"
        }
      ]
    }
    res.status(400).send(message);
    return;
  }

  const newVideo: VideoItem = {
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
  console.log(`Example app listening on port ${port}`)
})