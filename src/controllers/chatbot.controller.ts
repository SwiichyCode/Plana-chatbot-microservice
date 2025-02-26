import { Request, Response } from 'express';
import { deleteConversation, deleteQueue, getChatbotResponse } from '../services/chatbot-redis.service';
import { getChatbotResponse as getChatbotResponseJsonb } from '../services/chatbot-jsonb.service';
export class ChatbotController {
  static async getChatbotResponse(req: Request, res: Response) {
    try {
      const { userId, message } = req.body;
      if (!userId || !message) return res.status(400).json({ message: 'Missing parameters' });
      const chatbotResponse = await getChatbotResponse(userId, message);
      return res.status(200).json({ response: chatbotResponse });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async deleteConversation(req: Request, res: Response) {
    try {
      const { userId } = req.body;
      if (!userId) return res.status(400).json({ message: 'Missing parameters' });
      await deleteConversation(userId);
      return res.status(200).json({ message: 'Conversation deleted' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async deleteQueue(req: Request, res: Response) {
    try {
      await deleteQueue();
      return res.status(200).json({ message: 'Queue deleted' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getChatbotResponseJsonb(req: Request, res: Response) {
    try {
      const { conversationId, prompt } = req.body;
      if (!conversationId || !prompt) return res.status(400).json({ message: 'Missing parameters' });
      const chatbotResponse = await getChatbotResponseJsonb(conversationId, prompt);
      return res.status(200).json({ response: chatbotResponse });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
