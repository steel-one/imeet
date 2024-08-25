import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  mixin,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const PermissionsGqlGuard = (permissions: string | string[]) => {
  class PermissionsGqlGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const req = GqlExecutionContext.create(context).getContext().req;
      const expectedPermissions = Array.isArray(permissions)
        ? permissions
        : [permissions];
      if (!expectedPermissions) {
        return true;
      }
      if (!req.user || typeof req.user.scope !== 'string') {
        return false;
      }
      const scopes = req.user.scope.split(' ');
      expectedPermissions.forEach((scope) => {
        if (scopes.indexOf(scope) === -1) {
          throw new UnauthorizedException(`${scope} is required.`);
        }
      });
      return true;
    }
  }

  return mixin(PermissionsGqlGuardMixin);
};
