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


    //TODO add agent ios/android to store 2 token

    const expected = this.loginTokenStore.getToken();


    if (!headerAuth || !expected) {
      throw new ForbiddenException('missing or invalid authorization');
    }
    const match = headerAuth.toString().trim() === `Bearer ${expected}`;
    if (!match) {
      throw new ForbiddenException('invalid token');
    }
    return true;
  }
}
