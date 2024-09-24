import { applyDecorators, Post, UsePipes } from '@nestjs/common';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { AddMemberDTO } from '../../dto/member';
import { Auth } from 'src/auth/auth.decorator';
import { UniqueMemberPipe, UniqueMemberRolePipe } from '../../pipe';

export const AddMemberDecorator = () =>
  applyDecorators(
    Auth(),
    Post(),
    UsePipes(UniqueMemberPipe, UniqueMemberRolePipe),
    ApiOperation({ summary: 'Создание участника  ' }),
    ApiCreatedResponse({
      description: 'Участник создан',
      type: AddMemberDTO,
    }),
    ApiBadRequestResponse({ description: 'Неверные данные' }),
  );
