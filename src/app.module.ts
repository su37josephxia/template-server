import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CMSModule } from './cms/cms.module';
import { AllExceptionsFilter } from './shared/filters/AllExceptionFilter'
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [UserModule, CMSModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_FILTER,
    useClass: AllExceptionsFilter,
  },],
})
export class AppModule {

}

