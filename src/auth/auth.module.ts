import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from 'src/app/config';
import { HttpModule, HttpService } from '@nestjs/axios';
import { AuthGuard } from './auth.guard';
import { JWTTokenService } from './token.service';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [
    AuthGuard,
    {
      provide: JWTTokenService,
      inject: [HttpService, ConfigService],
      useFactory: (http: HttpService, config: ConfigService) =>
        new JWTTokenService(http, config.profileBaseURL),
    },
  ],
  exports: [AuthGuard, JWTTokenService],
})
export class AuthModule {}
