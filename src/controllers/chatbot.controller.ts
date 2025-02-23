import { Request, Response } from 'express';
import { getChatbotResponse } from '../services/chatbot.service';

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
}
