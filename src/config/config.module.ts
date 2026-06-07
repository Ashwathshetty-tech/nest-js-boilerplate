import { Global, Module } from '@nestjs/common';
import { MongodbProvider } from './mongodb.provider';
import { PostgresProvider } from './postgres.provider';
import { RedisProvider } from './redis.provider';

@Global()
@Module({
  providers: [MongodbProvider, PostgresProvider, RedisProvider],
  exports: [MongodbProvider, PostgresProvider, RedisProvider],
})
export class ConfigModule {}
