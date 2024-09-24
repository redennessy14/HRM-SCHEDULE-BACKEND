import { applyDecorators, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Auth } from 'src/auth/auth.decorator';

export const GetTeamSchdeduleDecorator = () =>
  applyDecorators(
    // Auth(),
    Get(':id'),
    ApiOperation({ summary: 'Получение графика команды' }),
  );
