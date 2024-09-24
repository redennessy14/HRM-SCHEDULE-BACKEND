import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export const TeamSchedule = () =>
  applyDecorators(ApiTags('График команды'), Controller('team-schedules'));
