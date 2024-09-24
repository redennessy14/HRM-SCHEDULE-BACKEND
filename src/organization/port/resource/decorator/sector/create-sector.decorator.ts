import { applyDecorators, Post, UsePipes } from '@nestjs/common';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { CreateSectorDTO } from '../../dto/sector';
import { Auth } from 'src/auth/auth.decorator';
import { UniqueSectorNamePipe } from '../../pipe';

export const CreateSectorDecorator = () =>
  applyDecorators(
    Auth(),
    Post(),
    UsePipes(UniqueSectorNamePipe),
    ApiOperation({ summary: 'Создание сектора' }),
    ApiCreatedResponse({
      description: 'Сектор создан',
      type: CreateSectorDTO,
    }),
    ApiBadRequestResponse({ description: 'Неверные данные' }),
  );
