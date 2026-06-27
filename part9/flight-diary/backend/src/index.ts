import express from "express";
import diaryRouter from './routes/diaries';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

app.use('/api/diaries', diaryRouter);

app.listen(PORT, () => {
  console.log("Listen server on url http://localhost:" + PORT);
});
