import { applyDecorators, Post, UsePipes } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CreateDepartamentDTO } from '../../dto/departament/create-departament.dto';
import { UniqueDepartamentNamePipe } from '../../pipe';

export const CreateDepartamentDecorator = () =>
  applyDecorators(
    Post(),
    UsePipes(UniqueDepartamentNamePipe),
    ApiOperation({ summary: 'Создание отдела ' }),
    ApiCreatedResponse({
      description: 'Отдел создан',
      type: CreateDepartamentDTO,
    }),
    ApiBadRequestResponse({ description: 'Неверные данные' }),
  );
