import { Module } from '@nestjs/common';
import { ResourceLobbyController } from './v1/resource.lobby.controller';
import { ResourceAuthController } from './v1/resource.auth.controller';
import { SendFormLobbyController } from './v1/send.form-login.controller';
import { SendAuthController } from './v1/send.auth.controller';
import { LoginTokenStore } from './v1/login-token-store.service';
import { ResourceRepositoryService } from './v1/resource-repository.service';
import { HealthController } from './v1/health.controller';
import { AuthGuard } from './v1/auth.guard';
import { AuthGuardOptional } from './v1/auth.guard-optional';
import { LoggingInterceptor } from './v1/logging.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [],
  controllers: [
    HealthController,
    ResourceAuthController,
    ResourceLobbyController,
    SendFormLobbyController,
    SendAuthController,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    AuthGuard,
    AuthGuardOptional,
    LoginTokenStore,
    ResourceRepositoryService,
  ],
})
export class AppModule {}
