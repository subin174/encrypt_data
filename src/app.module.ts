import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfiguration } from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { AuthModule } from './config/auth/auth.module';
import { CryptController } from './controller/encrypt.controller';
import { EncryptionService } from './service/crypto.service';
import { AccountRepository } from './repository/account.repository';
import { SettingService } from './service/setting.service';
import { AccountService } from './service/account.service';
import { Repository } from './repository/main.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfiguration],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      synchronize: true,
      database: process.env.MYSQL_DATABASE,
      port: parseInt(process.env.MYSQL_PORT),
      logging: true
    }),
    AuthModule
  ],
  controllers: [AppController, CryptController],
  providers: [AppService, EncryptionService, SettingService, AccountService, Repository, AccountRepository],
})
export class AppModule { }
