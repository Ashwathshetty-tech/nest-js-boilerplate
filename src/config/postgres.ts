import pg from 'pg';
import { logger } from './logger';

const { Pool } = pg as any;

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    port: process.env.POSTGRES_PORT as any,
    max: 5,
    idleTimeoutMillis: 100000,
});

export const connectPostgres = async () => {
  try {
    await pool.connect();
    logger.info('PostgreSQL Connected');
  } catch (error: any) {
    logger.error('PostgreSQL Connection Failed', error);
    process.exit(1);
  }
};

export default pool;
