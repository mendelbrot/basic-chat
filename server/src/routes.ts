import express, { Router } from 'express';
import { getMessages } from '../controllers/message.controller'

const router: Router = express.Router();

router.get('/', getMessages);

export default router;