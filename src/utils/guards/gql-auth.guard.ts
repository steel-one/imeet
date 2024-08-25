import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class GQLAuthGuard implements CanActivate {
  private readonly logger = new Logger(GQLAuthGuard.name);
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const type = context.getType();
    /** TODO: Remove this condition once base development is finished
     *  - no need for BFF
     * (FOR gRPC ServerReflectionInfo) */
    if (type === 'rpc') {
      return true;
    }
    const gqlContext = GqlExecutionContext.create(context);
    const { req } = gqlContext.getContext();

    return this.validateToken(req);
  }

  private async validateToken(req): Promise<boolean> {
    try {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.replace(/Bearer /, '');
        const decodedToken = this.jwtService.decode(token);
        req.user = {
          userId: decodedToken.sub,
          scope: decodedToken['scope'],
        };
        return req.user;
      }
      return false;
    } catch (err) {
      this.logger.error('Auth guard error: Cannot get signing key', err);
      return false;
    }
  }
}
