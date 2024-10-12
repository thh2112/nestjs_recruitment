import { Module } from '@nestjs/common';
import { SecurityHashingService } from './_provides';

@Module({
  providers: [SecurityHashingService],
  exports: [SecurityHashingService],
})
export class CoreModule {}
