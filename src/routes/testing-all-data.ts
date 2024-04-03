import { Router, Request, Response } from 'express';
import {videoItems} from './video-router';

export const testingRouter = Router({});

testingRouter.delete('/all-data', (req: Request, res: Response) => {
    videoItems.length = 0;
  
    res.send(204);
});