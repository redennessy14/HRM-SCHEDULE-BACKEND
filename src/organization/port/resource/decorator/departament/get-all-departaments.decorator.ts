import { applyDecorators, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Auth } from 'src/auth/auth.decorator';

export const GetAllDepartamentsDecorator = () =>
  applyDecorators(
    Auth(),
    Get(),
    ApiOperation({ summary: 'Получение всех отделов' }),
  );