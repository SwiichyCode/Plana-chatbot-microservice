import { openai } from '../config/openai';
import redisClient from '../config/redis';
import config from '../config/env';

const getConversation = async (userId: string) => {
  const history = await redisClient.get(`chat:${userId}`);
  return history
    ? JSON.parse(history)
    : [{ role: 'system', content: 'Tu es un assistant pour une application de gestion de tâches.' }];
};

const saveConversation = async (userId: string, messages: unknown) => {
  await redisClient.set(`chat:${userId}`, JSON.stringify(messages), { EX: config.EXPIRATION_TIME });
};

const enqueueConversation = async (userId: string, messages: string) => {
  await redisClient.rPush('chatQueue', JSON.stringify({ userId, messages }));
};

export const getChatbotResponse = async (userId: string, message: string) => {
  const conversation = await getConversation(userId);
  conversation.push({ role: 'user', content: message });

  const response = await openai.chat.completions.create({
    model: 'chatgpt-4o-latest',
    messages: conversation,
  });

  const botMessage = response.choices[0].message.content;
  conversation.push({ role: 'assistant', content: botMessage });

  await saveConversation(userId, conversation);

  await enqueueConversation(userId, conversation);

  return botMessage;
};
