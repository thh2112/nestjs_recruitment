import { Module } from '@nestjs/common';
import { UsersService } from '@/features/users//users.service';
import { UsersController } from '@/features/users//users.controller';
import { User, UserSchema } from '@/features/users/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from '@/shared/shared.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), SharedModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
