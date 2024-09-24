import { applyDecorators, Post, UsePipes } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CreateProjectDTO } from '../../dto/project';
import { UniqueProjectNamePipe } from '../../pipe';
import { Auth } from 'src/auth/auth.decorator';

export const CreateProjectDecorator = () =>
  applyDecorators(
    Auth(),
    Post(),
    UsePipes(UniqueProjectNamePipe),
    ApiOperation({ summary: 'Создание проекта' }),
    ApiCreatedResponse({
      description: 'Проект создан',
      type: CreateProjectDTO,
    }),
    ApiBadRequestResponse({ description: 'Неверные данные' }),
  );
