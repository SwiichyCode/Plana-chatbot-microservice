import { createClient } from 'redis';
import config from './env';

export const redisClient = createClient({
  socket: {
    host: config.REDIS_HOST,
    port: config.REDIS_PORT,
  },
});

redisClient.on('error', err => {
  console.error('Redis Client Error:', err);
});
