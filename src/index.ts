import express, { Express }  from 'express';
import bodyParser from 'body-parser';
import { videosRouter } from './routes/video-router';
import { testingRouter } from './routes/testing-all-data';

const app: Express = express();
const port = process.env.PORT || 3000;

const parserMiddleware = bodyParser();
app.use(parserMiddleware);

app.use('/videos', videosRouter);
app.use('/testing', testingRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});