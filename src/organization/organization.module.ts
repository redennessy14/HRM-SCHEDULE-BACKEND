import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from 'src/app/config';

import { Application } from './application';
import { Adapters, Resources } from './port';
import { Persistence } from './port/persistence';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  DepartamentEntity,
  ProjectEntity,
  TeamEntity,
  MemberEntity,
  SectorEntity,
} from 'src/data-access';
import { HttpModule, HttpService } from '@nestjs/axios';
import { JWTTokenService } from 'src/auth/token.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: 'TCP_PROFILE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: ({ tcp }: ConfigService) => tcp,
      },
    ]),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        baseURL: configService.profileBaseURL,
      }),
    }),
    TypeOrmModule.forFeature([
      ProjectEntity,
      DepartamentEntity,
      SectorEntity,
      TeamEntity,
      MemberEntity,
    ]),
  ],
  controllers: [...Resources],
  providers: [
    ...Adapters,
    ...Application,
    ...Persistence,
    AuthGuard,
    {
      provide: JWTTokenService,
      inject: [HttpService, ConfigService],
      useFactory: (http: HttpService, config: ConfigService) =>
        new JWTTokenService(http, config.profileBaseURL),
    },
  ],
})
export class OrganizationModule {}
