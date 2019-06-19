import config = require('./config');

import * as express from 'express';
import * as  cluster from 'cluster';
import * as bodyParser from 'body-parser';

import logger = require('./utils/logger');

import { cpus } from 'os';

import { apiRouter } from './controllers/api';

if (cluster.isMaster) {
  // Create a worker for each CPU
  for (let i = 0; i < cpus().length; i++) {
    cluster.fork();
  }

  cluster.on('online', (worker) => {
    logger.info(`worker online, worker id: ${worker.id}`);
  });

  // If worker dies, create another one
  cluster.on('exit', (worker, code, signal) => {
    logger.error(`worker died, worker id: ${worker.id} | signal: ${signal} | code: ${code}`);
    cluster.fork();
  });

} else {
  // Create express app
  const app: express.Express = express();

  app.use(bodyParser.json());

  app.use(apiRouter);

  // Listen
  app.listen(config.port, function () {
    logger.info(`worker started: ${cluster.worker.id} | listening on port: ${config.port} | env: ${config.env}`);
  });
}
