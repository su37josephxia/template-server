import { Module } from '@nestjs/common';
import { ShareModule } from '../shared/shared.module';
import { ContentController } from './controllers/content.controller';
import { CMSProviders } from './cms.providers';
import { ContentService } from './services/content.service';
import { TemplateController } from './controllers/template.controller';



@Module({
    imports: [
        ShareModule,
    ],
    controllers: [
        ContentController, TemplateController
    ],
    providers: [
        ...CMSProviders, ContentService

    ],
    exports: [
        // UserService, AuthService, ...UserProviders
    ],

})
export class CMSModule { }