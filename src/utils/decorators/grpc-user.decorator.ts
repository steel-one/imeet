import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export interface IAuthUser {
  userId: string;
  scope: string;
}

export const AuthUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    return context.switchToRpc().getContext().user;
  },
);
