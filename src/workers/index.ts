import redisClient from '../config/redis';
import { prisma } from '../config/prisma';

async function processQueue() {
  console.log('[Worker] Starting queue processing...');

  while (true) {
    try {
      const message = await redisClient.lPop('chatQueue');

      if (!message) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        continue;
      }

      const { userId, messages } = JSON.parse(message);

      await prisma.$transaction(async tx => {
        await tx.conversation.create({
          data: {
            userId,
            messages,
          },
        });
      });
    } catch (error) {
      console.error('[Worker] Error processing message:', error);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}

process.on('SIGTERM', async () => {
  console.log('Shutting down...');
  await prisma.$disconnect();
  process.exit(0);
});

processQueue().catch(console.error);
