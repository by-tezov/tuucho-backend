import { Module } from '@nestjs/common';
import { ResourceController } from './v1/resource.controller';
import { SendController } from './v1/send.controller';

@Module({
  imports: [],
  controllers: [ResourceController, SendController],
  providers: [],
})
export class AppModule {}
