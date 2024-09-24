import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export const Member = () =>
  applyDecorators(ApiTags('Участник'), Controller('members'));
