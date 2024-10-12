import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { CoreModule } from '@/core/core.module';
import { UsersModule } from '../users/users.module';
import { SharedModule } from '@/shared/shared.module';

@Module({
  imports: [PassportModule, UsersModule, SharedModule],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
