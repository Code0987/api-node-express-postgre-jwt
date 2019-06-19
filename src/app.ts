import config = require('./config');
import * as express from 'express';
import logger = require('./utils/logger');

import { apiRouter } from './controllers/api';

// Create express app
const app: express.Express = express();

app.use(express.json());

app.use(apiRouter);

// Listen
app.listen(config.port, function () {
  logger.info(`listening on port: ${config.port} | env: ${config.env}`);
});
