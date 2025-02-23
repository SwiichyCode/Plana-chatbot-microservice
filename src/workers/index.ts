import redisClient from '../config/redis';

async function processQueue() {
  console.log('Processing queue...');

  while (true) {
    try {
      const message = await redisClient.lPop('chatQueue');
      if (!message) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        console.log('No message in queue');
        continue;
      }

      const { userId, messages } = JSON.parse(message);
      console.log(`Processing message for user ${userId} && messages ${messages}`);
    } catch (error) {
      console.error(error);
    }
  }
}

processQueue().catch(console.error);
