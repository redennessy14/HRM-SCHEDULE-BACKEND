import { applyDecorators, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Auth } from 'src/auth/auth.decorator';

export const GetProjectsForMemberDecorator = () =>
  applyDecorators(
    Auth(),
    Get('members'),
    ApiOperation({ summary: 'Получение всех проектов участника' }),
  );
