import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from './shared/filters/AllExceptionFilter';
import { CMSModule } from './cms/cms.module';

@Module({
  imports: [UserModule, CMSModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_FILTER,
    useClass: AllExceptionFilter,
  },],
})
export class AppModule { }
