import { createClient } from 'redis';
import config from '../config/env';

const redisClient = createClient({
  url: `redis://default:${config.REDIS_PASSWORD}@${config.REDIS_HOST}:${config.REDIS_PORT}`,
});

redisClient.on('error', err => console.error('Redis Client Error', err));
redisClient.on('connect', () => console.log('Redis Client Connected'));

const connectRedis = async () => {
  await redisClient.connect();
};

connectRedis().catch(console.error);

export default redisClient;
