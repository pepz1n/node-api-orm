import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import fs from 'fs';
import path from 'path';
import routes from './routes';
import { isAuthenticated } from './utils/isAuthenticated';

const app = express();

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, '../access.log'),
  { flags: 'a' }
);

app.use(helmet());
app.use(morgan('combined', { stream: accessLogStream }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));


app.use('/usuario', routes.usuario);
app.use('/produto', routes.produto);
app.use('/cigarro', routes.cigarro);
app.use('/notas', routes.notas);
app.use('/media', routes.media)


app.use((req, res) => {
  res.status(404).send('404: Page not found');
});


app.listen(3000, () => {
  console.log(`Example app listening on port 3000!`);
});
