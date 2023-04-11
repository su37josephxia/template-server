import { Content } from './entities/content.mongo.entity';

export const CMSProviders = [
    {
        provide: 'CONTENT_REPOSITORY',
        useFactory: async (AppDataSource) => await AppDataSource.getRepository(Content),
        inject: ['MONGODB_DATA_SOURCE'],
    },
];

