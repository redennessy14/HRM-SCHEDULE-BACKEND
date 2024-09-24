import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export const Sector = () =>
  applyDecorators(ApiTags('Секторы'), Controller('sectors'));
