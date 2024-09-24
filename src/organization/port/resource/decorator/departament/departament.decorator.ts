import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export const Departament = () =>
  applyDecorators(ApiTags('Отдел'), Controller('departaments'));
