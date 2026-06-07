import { Module } from '@nestjs/common';
import { ActorModule } from './modules/actor/actor.module';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [ConfigModule, ActorModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
