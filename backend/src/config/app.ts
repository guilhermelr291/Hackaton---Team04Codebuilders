import express from 'express';
import setupRoutes from './routes';
import { errorHandler } from '../common/middlewares/error-handler-middleware';
import { authMiddleware } from '../common/middlewares/check-auth-middleware';
import { cors } from '../common/middlewares/cors';

const app = express();
app.use(cors);
app.use(express.json());
app.use(authMiddleware);
setupRoutes(app);
app.use(errorHandler);

export default app;
