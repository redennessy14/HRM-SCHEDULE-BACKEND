import { applyDecorators, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export const GetAllMemberSchedulesDecorator = () =>
  applyDecorators(
    Get(),
    ApiOperation({ summary: 'Получение всех график участников' }),
  );
