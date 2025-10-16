import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { LoginTokenStore } from './login-token-store.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly loginTokenStore: LoginTokenStore) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const headers = request.headers;
    const headerAuth = headers['Authorization'];
    const expected = this.loginTokenStore.getToken();
    if (!headerAuth || !expected) {
      throw new UnauthorizedException('missing or invalid authorization');
    }
    const match = headerAuth.toString().trim() === `Bearer ${expected}`;
    if (!match) {
      throw new ForbiddenException('invalid token');
    }
    return true;
  }
}
