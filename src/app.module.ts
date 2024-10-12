import * as configurations from '@/configs/index';
import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { values as _values } from 'lodash';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CONFIG_KEYS } from './constant';
import { AuthModule } from './features/auth/auth.module';
import { UsersModule } from './features/users/users.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local', '.env.production'],
      cache: true,
      load: _values(configurations),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const { url, name } = configService.get(CONFIG_KEYS.DATABASE);
        return {
          uri: url,
          dbName: name,
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  onModuleInit() {}
}
