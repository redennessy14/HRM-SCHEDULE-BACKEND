import { applyDecorators, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { CreateShiftDTO } from '../../dto/shift';

export const CreateShiftDecorator = () =>
  applyDecorators(
    Post(),
    ApiOperation({ summary: 'Создание смен ' }),
    ApiCreatedResponse({
      description: 'Смена создана',
      type: CreateShiftDTO,
    }),
    ApiBadRequestResponse({ description: 'Неверные данные' }),
  );
