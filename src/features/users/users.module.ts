import { Module } from '@nestjs/common';
import { UsersService } from '@/features/users//users.service';
import { UsersController } from '@/features/users//users.controller';
import { User, UserSchema } from '@/features/users/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
