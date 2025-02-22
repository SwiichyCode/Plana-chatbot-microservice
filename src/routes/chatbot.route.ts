import { Router, Request, Response } from 'express';
import { chatbotHandler } from '../controllers/chatbot.controller';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  await chatbotHandler(req, res);
});

export default router;
