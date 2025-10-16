import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

@Injectable()
export class AuthGuardOptional implements CanActivate {
  constructor(private readonly authGuard: AuthGuard) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const headers = request.headers;

    console.log(headers)

    const headerAuth = headers['authorization'];
    if (!headerAuth) return true;
    return this.authGuard.canActivate(context);
  }
}
