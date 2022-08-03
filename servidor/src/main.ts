import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { writeFile } from 'node:fs/promises';
const app: Application = express();
app.use(
  cors({
    origin: '*',
  })
);
app.use(express.json({ limit: '50mb' }));

app.post('/api/pdf', (req: Request, res: Response): void => {
  //console.log(`Datos PDF: ${req.body.pdf}`);
  const body = req.body.pdf;
  const data = body.replace('data:application/pdf;base64,', '').trim();
  const buffer = Buffer.from(data, 'base64');
  writeFile('pdf.pdf', buffer, { encoding: 'binary' });
  res.send('Ok');
});

app.get('/', (req, res) => {
  res.redirect('https://node-wnu1a6--5173.local.webcontainer.io');
});

app.listen(5001, () => {
  console.log('Servidor escuchando en puerto 5001...');
});
