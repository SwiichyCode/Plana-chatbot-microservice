import express from 'express';
import cors from 'cors';
import { limiter } from './middlewares/rate-limiter';
import { errorHandler } from './middlewares/error-handler';
import chatbotRoutes from './routes/chatbot.route';
import testRoutes from './routes/test.route';

const app = express();
app.set('trust proxy', 1);

app.use(express.json());
app.use(cors());
app.use(limiter);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/test', testRoutes);
app.use(errorHandler);

export default app;
