import { applyDecorators, Delete } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Auth } from 'src/auth/auth.decorator';

export const DeleteMemberDecorator = () =>
  applyDecorators(
    Auth(),
    Delete(':id'),
    ApiOperation({ summary: 'Удаление участника' }),
  );