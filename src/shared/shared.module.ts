import { CoreModule } from '@/core/core.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [CoreModule],
  exports: [CoreModule],
})
export class SharedModule {}
