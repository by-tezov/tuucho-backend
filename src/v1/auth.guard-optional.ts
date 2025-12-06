import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { Reflector } from '@nestjs/core';
import { PATH_METADATA } from '@nestjs/common/constants';

@Injectable()
export class AuthGuardOptional implements CanActivate {
  constructor(
   private readonly reflector: Reflector,
   readonly authGuard: AuthGuard
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const url: string = request.url || '';
    const headerAuth = request.headers['authorization'];

    const controllerPath = this.reflector.get<string>(
      PATH_METADATA,
      context.getClass(),
    );
    const base = `/${controllerPath}`;
    const relative = request.url.startsWith(base) ? request.url.substring(base.length) : request.url;
    if (url.startsWith('/auth') || headerAuth != null) {
      return this.authGuard.canActivate(context);
    }
    return true;
  }
}
