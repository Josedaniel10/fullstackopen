import express from 'express';
import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(express.json());

app.use(cors());

app.get('/api/ping', (_req, res)=> {
  res.send('Pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, ()=> {
    console.log('Listen server on http://localhost:' + PORT);
});