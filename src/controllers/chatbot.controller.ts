import { Request, Response } from 'express';
import { getChatbotResponse } from '../services/chatbot.service';

export const chatbotHandler = async (req: Request, res: Response) => {
  const { userId, message } = req.body;
  if (!userId || !message) return res.status(400).json({ message: 'Missing parameters' });

  try {
    const chatbotResponse = await getChatbotResponse(userId, message);
    return res.status(200).json({ response: chatbotResponse });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
