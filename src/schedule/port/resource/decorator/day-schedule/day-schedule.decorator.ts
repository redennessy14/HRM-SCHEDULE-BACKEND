import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export const DaySchedule = () =>
  applyDecorators(ApiTags('График дня'), Controller('day-schedules'));
