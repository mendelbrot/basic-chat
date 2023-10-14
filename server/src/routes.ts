import express, { Router } from 'express';
import { getMessages } from './controllers/messages.controller'

const router: Router = express.Router();

router.get('/messages', getMessages);

export default router;