import { applyDecorators, Post, UsePipes } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { UniqueTeamNamePipe } from '../../pipe';
import { CreateDepartamentDTO } from '../../dto/departament';

export const CreateTeamDecorator = () =>
  applyDecorators(
    Post(),
    UsePipes(UniqueTeamNamePipe),
    ApiOperation({ summary: 'Создание команды ' }),
    ApiCreatedResponse({
      description: 'Команда создан',
      type: CreateDepartamentDTO,
    }),
    ApiBadRequestResponse({ description: 'Неверные данные' }),
  );
