import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const handler = context.getHandler();
    const expectedPermissions = this.reflector.get<string[]>(
      'permissions',
      handler,
    );
    if (!expectedPermissions) {
      return true;
    }
    if (!req.user || typeof req.user.scope !== 'string') {
      return false;
    }
    const scopes = req.user.scope.split(' ');
    return expectedPermissions.some((scope) => scopes.indexOf(scope) !== -1);
  }
}
