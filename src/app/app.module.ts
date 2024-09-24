import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule, ConfigService } from './config';
import { MonitoringModule } from './monitoring';
import { OrganizationModule } from 'src/organization';
import { AuthModule } from 'src/auth/auth.module';
import { ScheduleModule } from 'src/schedule';

@Module({
  imports: [
    MonitoringModule,
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: ({ app: { rateLimiting } }: ConfigService) => rateLimiting,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: ({ database }: ConfigService) => database,
    }),
    AuthModule,
    OrganizationModule,
    ScheduleModule,
  ],
})
export class AppModule {}
