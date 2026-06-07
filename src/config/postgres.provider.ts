import { Provider } from '@nestjs/common';
import { Pool } from 'pg';

export const PostgresProvider: Provider = {
  provide: 'POSTGRES_POOL',
  useFactory: () => {
    const pool = new Pool({
      connectionString: process.env.POSTGRES_URL || undefined,
      host: process.env.POSTGRES_HOST || 'localhost',
      port: process.env.POSTGRES_PORT ? Number(process.env.POSTGRES_PORT) : 5432,
      user: process.env.POSTGRES_USER || undefined,
      password: process.env.POSTGRES_PASSWORD || undefined,
      database: process.env.POSTGRES_DB || undefined,
    });
    return pool;
  },
};
