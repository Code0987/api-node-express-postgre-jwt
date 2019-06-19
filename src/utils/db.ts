import * as pg from 'pg';
import config = require('../config');
import logger = require('./logger');

const pgconfig = {
  connectionString: config.db.url,
  max: config.db.max,
  idleTimeoutMillis: config.db.idleTimeoutMillis
}

const pool = new pg.Pool(pgconfig);

logger.info(`pg: ${JSON.stringify(pgconfig)}`);

pool.on('error', function (err: Error, client: pg.Client) {
  logger.error(`pg pool error, ${err.message} | ${err.stack}`);
});

export const query = async (sql: string, data: string[][]) => {
  logger.debug(`query() <- sql: ${sql} | data: ${data}`);
  let result: pg.QueryResult;
  try {
    result = await pool.query(sql, data);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
}
