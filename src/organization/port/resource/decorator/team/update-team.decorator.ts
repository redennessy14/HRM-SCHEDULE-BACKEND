import { applyDecorators, Patch } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Auth } from 'src/auth/auth.decorator';

export const UpdateTeamDecorator = () =>
  applyDecorators(
    Auth,
    Patch(':id'),
    ApiOperation({ summary: 'Редактирование команды' }),
  );
