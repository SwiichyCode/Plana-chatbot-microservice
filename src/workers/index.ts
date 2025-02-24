import redisClient from '../config/redis';

async function processQueue() {
  console.log('[Worker] Starting queue processing...');

  while (true) {
    try {
      console.log('[Worker] Checking for new messages...');
      const message = await redisClient.lPop('chatQueue');

      if (!message) {
        console.log('[Worker] No messages found, waiting...');
        await new Promise(resolve => setTimeout(resolve, 5000));
        continue;
      }

      const { userId, messages } = JSON.parse(message);
      console.log(`[Worker] Processing message for user ${userId} && messages ${messages}`);
    } catch (error) {
      console.error('[Worker] Error processing message:', error);
    }
  }
}

processQueue().catch(console.error);
