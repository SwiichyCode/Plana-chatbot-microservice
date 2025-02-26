import redisClient from '../config/redis';
import { prisma } from '../config/prisma';

async function processQueue() {
  console.log('[Worker] Starting queue processing...');

  while (true) {
    try {
      const message = await redisClient.lPop('chatQueue');
      console.log('[Worker] Processing message:', message, '[At]', new Date());

      if (!message) {
        await new Promise(resolve => setTimeout(resolve, 15000));
        continue;
      }

      const { userId, messages } = JSON.parse(message);
      const conversation = await prisma.conversation.create({
        data: {
          userId,
          messages,
        },
      });

      console.log('[Worker] Conversation created:', conversation);
      await redisClient.del(`chat:${userId}`);
    } catch (error) {
      console.error('[Worker] Error processing message:', error);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}

processQueue().catch(console.error);
