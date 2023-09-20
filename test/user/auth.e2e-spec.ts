import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserModule } from '../../src/user/user.module';

describe('AuthController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [UserModule,],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    describe('/auth/login (POST)', () => {
        it('should return a token when username and password are correct', async () => {
            const response = await request(app.getHttpServer())
                .post('/api/login')
                .send({ name: 'admin', password: 'admin' })
                .expect(200);
            expect(response.body.sessionId).toBeDefined()
        })


        it('should return 500 Unauthorized when username or password is incorrect', async () => {
            await request(app.getHttpServer())
                .post('/api/login')
                .send({ name: 'admin', password: '888881' })
                .expect(500);
        })
    })


    afterEach(async () => {
        await app.close();
    });
});