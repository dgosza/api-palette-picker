import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import helmet from 'helmet';

import logger from './lib/logger';
import routes from './modules/message/routes';

const app = express();
const PORT = parseInt(process.env.APP_PORT as string) || 8080;

app.use(express.json());
app.use(helmet());
app.use(routes);

app.listen(PORT, async () => {
  logger.info(`running on port ${PORT}`);
});
