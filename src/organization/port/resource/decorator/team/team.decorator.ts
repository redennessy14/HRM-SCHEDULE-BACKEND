import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export const Team = () =>
  applyDecorators(ApiTags('Команда'), Controller('teams'));
