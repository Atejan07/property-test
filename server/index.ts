import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { router } from './routes/index';
import { errorHandler } from './errorMiddleware/errorHandler';

const PORT = process.env.PORT || 3001;
const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App is running at PORT ${PORT}`);
});

export { app };
