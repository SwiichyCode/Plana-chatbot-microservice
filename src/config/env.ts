import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().transform(val => parseInt(val, 10)),
  OPENAI_API_KEY: z.string().min(1),
  MISTRAL_API_KEY: z.string().min(1),
  REDIS_HOST: z.string().min(1),
  REDIS_PORT: z.string().transform(val => parseInt(val, 10)),
  REDIS_PASSWORD: z.string().min(1),
  EXPIRATION_TIME: z.string().transform(val => parseInt(val, 10)),
});

type EnvConfig = z.infer<typeof envSchema>;

const config = envSchema.parse({
  PORT: process.env.PORT,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  MISTRAL_API_KEY: process.env.MISTRAL_API_KEY,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  EXPIRATION_TIME: process.env.EXPIRATION_TIME,
}) satisfies EnvConfig;

export default config;
