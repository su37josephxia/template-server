import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { ShareModule } from '../shared/shared.module';
import { UserProviders } from './user.providers';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';

@Module({
  controllers: [UserController, AuthController],
  providers: [UserService, ...UserProviders, AuthService, JwtStrategy],
  imports: [ShareModule,
    JwtModule.registerAsync({
      inject: [ConfigService,
      ],
      imports: [ShareModule,],
      useFactory: (configService: ConfigService) => (configService.get('jwt'))
    }),
  ]
})
export class UserModule { }
