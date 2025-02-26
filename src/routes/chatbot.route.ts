import { Router } from 'express';
import { ChatbotController } from '../controllers/chatbot.controller';
import { asyncHandler } from '../utils/async-handler';

const router = Router();

router.post('/', asyncHandler(ChatbotController.getChatbotResponse));
router.delete('/delete-conversation', asyncHandler(ChatbotController.deleteConversation));
router.delete('/delete-queue', asyncHandler(ChatbotController.deleteQueue));

router.post('/jsonb', asyncHandler(ChatbotController.getChatbotResponseJsonb));
export default router;
