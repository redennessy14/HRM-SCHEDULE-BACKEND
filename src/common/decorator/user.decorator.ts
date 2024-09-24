import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (prop: string = null, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const user = request.user;

    return user?.id;
  },
);
