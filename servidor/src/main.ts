import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { writeFile } from 'node:fs/promises';
const app: Application = express();
app.use(
  cors({
    origin: '*',
  })
);
app.use(express.raw({ limit: '50mb' }));

app.post('/api/pdf', (req: Request, res: Response): void => {
  //console.log(`Datos PDF: ${req.body.pdf}`);
  const body = req.body;
  const data = body.toString().replace('data:application/pdf;base64,', '');
  const buffer = Buffer.from(data, 'base64');
  writeFile(`pdf_${Date.now()}.pdf`, buffer, { encoding: 'binary' });
  res.setHeader('Content-Type', 'application/octet-stream');
  res.send(buffer.toString('utf-8'));
});

app.get('/', (req, res) => {
  res.redirect('https://node-wnu1a6--5173.local.webcontainer.io');
});

app.listen(5001, () => {
  console.log('Servidor escuchando en puerto 5001...');
});
