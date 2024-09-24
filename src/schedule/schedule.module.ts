import { Module } from '@nestjs/common';
import { Persistence, Resource } from './port';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from 'src/app/config';
import {
  DayScheduleEntity,
  MemberEntity,
  MemberScheduleEntity,
  ShiftEntity,
  TeamEntity,
  TeamScheduleEntity,
} from 'src/data-access';
import { Application } from './application';
import { TeamRepository } from 'src/organization/port/persistence/team.repository';
import { MemberRepository } from 'src/organization/port/persistence/member.repository';
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
    TypeOrmModule.forFeature([
      TeamScheduleEntity,
      TeamEntity,
      MemberScheduleEntity,
      MemberEntity,
      DayScheduleEntity,
      ShiftEntity,
    ]),
  ],
  controllers: [...Resource],
  providers: [...Application, ...Persistence, TeamRepository, MemberRepository],
})
export class ScheduleModule {}
