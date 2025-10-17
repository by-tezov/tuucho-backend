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
    const token = headerAuth.toString().trim();
    if (!this.loginTokenStore.isValid(token)) {
      throw new ForbiddenException('invalid token');
    }
    return true;
  }
}
