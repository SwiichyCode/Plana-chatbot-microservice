import { Router } from 'express';
import { ChatbotController } from '../controllers/chatbot.controller';
import { asyncHandler } from '../utils/async-handler';

const router = Router();

router.post('/', asyncHandler(ChatbotController.getChatbotResponse));

export default router;
