import { Module } from '@nestjs/common';
import { ResourceController } from './v1/resource/pages.controller';

@Module({
  imports: [],
  controllers: [ResourceController],
  providers: [],
})
export class AppModule {}
