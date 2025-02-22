import { Mistral } from '@mistralai/mistralai';
import config from './env';

export const mistral = new Mistral({ apiKey: config.MISTRAL_API_KEY });
