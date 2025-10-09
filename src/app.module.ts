import { Module } from '@nestjs/common';
import { ResourceLobbyController } from './v1/resource.lobby.controller';
import { ResourceAuthController } from './v1/resource.auth.controller';
import { SendFormLobbyController } from './v1/send.form-login.controller';
import { SendAuthController } from './v1/send.auth.controller';
import { LoginTokenStore } from './v1/login-token-store.service';
import { ResourceRepositoryService } from './v1/resource-repository.service';
import { AuthGuard } from './v1/auth.guard';

@Module({
  imports: [],
  controllers: [
    ResourceAuthController,
    ResourceLobbyController,
    SendFormLobbyController,
    SendAuthController,
  ],
  providers: [AuthGuard, LoginTokenStore, ResourceRepositoryService],
})
export class AppModule {}
