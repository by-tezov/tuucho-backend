import { Controller, Post, Param, Res, Body, Headers } from '@nestjs/common';
import { Response } from 'express';
import type { IncomingHttpHeaders } from 'http';
import { LoginTokenStore } from './login-token-store.service';

@Controller('v1/send/form-from-page-login')
export class SendFormLobbyController {
  constructor(private readonly loginTokenStore: LoginTokenStore) {}

  private randomAuthorization(length = 20): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  @Post()
  getResource(
    @Res() res: Response,
    @Headers() headers: IncomingHttpHeaders,
    @Body() body: any,
  ) {
    console.log('received data with version=v1, url=form-from-page-login');
    console.log(`data: ${JSON.stringify(body)}`);

    const token = this.randomAuthorization();
    this.loginTokenStore.setToken(token);
    return res.status(200).json({
      'all-succeed': true,
      action: {
        before: [`store://key-value/save?login-authorization=${token}`],
      },
    });
  }
}
