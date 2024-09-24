import { applyDecorators, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { Auth } from 'src/auth/auth.decorator';
import { CreateTeamScheduleDTO } from '../../dto/team-schedule';

export const CreateTeamScheduleDecorator = () =>
  applyDecorators(
    // Auth(),
    Post(),
    ApiOperation({ summary: 'Создание графика команды  ' }),
    ApiCreatedResponse({
      description: 'График команды создан',
      type: CreateTeamScheduleDTO,
    }),
    ApiBadRequestResponse({ description: 'Неверные данные' }),
  );
