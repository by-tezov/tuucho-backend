import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { LoginTokenStore } from './login-token-store.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly loginTokenStore: LoginTokenStore) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const headers = request.headers;
    const headerAuth = headers['authorization'];
    if (!headerAuth) {
      throw new ForbiddenException('missing authorization header');
    }
    const parts = headerAuth.toString().trim().split(/\s+/);
    const token =
      parts.length === 2 && parts[0].toLowerCase() === 'bearer'
        ? parts[1]
        : undefined;

    if (!this.loginTokenStore.isValid(token)) {
      throw new ForbiddenException('invalid token');
    }
    return true;
  }
}
