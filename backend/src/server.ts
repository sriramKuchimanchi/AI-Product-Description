import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import generateRoute from './routes/generate';
import formatRoute from './routes/format';
import analyzeRoute from './routes/analyze';

const app = express();
const PORT: number = parseInt(process.env.PORT ?? '3000', 10);

app.use(cors());
app.use(express.json());

app.use('/api/generate', generateRoute);
app.use('/api/format', formatRoute);
app.use('/api/analyze', analyzeRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});