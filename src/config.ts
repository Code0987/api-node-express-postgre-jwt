import * as dotenv from 'dotenv';

const env = (process.env.NODE_ENV || 'dev');
const production = env === 'production';

dotenv.config({ path: production ? '.env' : '.env.dev' });

const config = {
  env: env,
  production: production,
  serviceName: process.env.SERVICENAME || 'app',
  port: process.env.PORT || 3000,
  loggerLevel: 'debug',
  db: {
    url: process.env.DATABASE_CONNECTION_POOL_URL || process.env.DATABASE_URL || '',
    max: 20,
    idleTimeoutMillis: 30000
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'app'
  }
}

export = config;
