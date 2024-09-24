import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export const MemberSchedule = () =>
  applyDecorators(
    ApiTags('График участника команды'),
    Controller('member-schedules'),
  );
