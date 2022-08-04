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
  // Llega como un Data URL asi que le remuevo el data:application/pdf;base64,
  // y dejo solo el base64.
  const data = body.toString().replace('data:application/pdf;base64,', '');
  // Con la data en base64 la escribo en un Buffer.
  const buffer = Buffer.from(data, 'base64');
  // Y finalmente escribo el buffer en un archivo .pdf en el disco con el
  // encoding en binario.
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
