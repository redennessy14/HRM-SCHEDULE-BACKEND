import { applyDecorators, Delete } from '@nestjs/common';
import { Auth } from 'src/auth/auth.decorator';

export const DeleteProjectDecorator = () =>
  applyDecorators(Auth(), Delete(':id'));
