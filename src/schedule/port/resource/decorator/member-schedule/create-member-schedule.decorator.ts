import { applyDecorators, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { CreateMemberScheduleDTO } from '../../dto/member-schedule';

export const CreateMemberScheduleDecorator = () =>
  applyDecorators(
    Post(),
    ApiOperation({ summary: 'Создание графика участника команды  ' }),
    ApiCreatedResponse({
      description: 'График участника создан',
      type: CreateMemberScheduleDTO,
    }),
    ApiBadRequestResponse({ description: 'Неверные данные' }),
  );
