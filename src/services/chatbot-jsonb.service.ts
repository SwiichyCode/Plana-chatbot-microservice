import { prisma } from '../config/prisma';
import { openai } from '../config/openai';
import { ChatCompletionMessageParam } from 'openai/resources';

const initialConversation = [
  {
    role: 'system',
    content:
      "Vous êtes un assistant de chatbot qui répond à toutes les questions posées par l'utilisateur en français.",
  },
];

export const getChatbotResponse = async (conversationId: string, prompt: string) => {
  const conversationResponse = await prisma.conversation.findUnique({
    where: { id: conversationId },
    select: { messages: true },
  });

  const conversation =
    (conversationResponse?.messages as Array<{ role: string; content: string }>) ?? initialConversation;
  conversation.push({ role: 'user', content: prompt });

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: conversation.map(msg => ({
      role: msg.role as 'user' | 'assistant' | 'system',
      content: msg.content,
    })) satisfies ChatCompletionMessageParam[],
  });

  const botMessage = response.choices[0].message.content ?? '';
  conversation.push({ role: 'assistant', content: botMessage });

  await prisma.conversation.upsert({
    where: { id: conversationId },
    create: {
      id: conversationId,
      userId: '123',
      messages: conversation,
    },
    update: {
      messages: conversation,
    },
  });

  return botMessage;
};
