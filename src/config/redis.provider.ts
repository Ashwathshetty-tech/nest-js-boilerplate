import { Provider } from '@nestjs/common';
import { createClient } from 'redis';

export const RedisProvider: Provider = {
  provide: 'REDIS_CLIENT',
  useFactory: async () => {
    const url = process.env.REDIS_URL || 'redis://localhost:6379';
    const client = createClient({ url });
    await client.connect().catch(() => {});
    return client;
  },
};
