import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export const Shift = () =>
  applyDecorators(ApiTags('Cмены'), Controller('shifts'));
