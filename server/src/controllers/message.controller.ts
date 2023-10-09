import { Request, Response } from 'express';

export function getMessages(req: Request, res: Response) {
  res.send('This is a message.  Hello!');
}

