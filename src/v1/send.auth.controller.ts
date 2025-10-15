import {
  Controller,
  Param,
  Post,
  Res,
  Body,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import type { IncomingHttpHeaders } from 'http';
import { AuthGuard } from './auth.guard';

@UseGuards(AuthGuard)
@Controller('v1/send/auth')
export class SendAuthController {
  constructor() {}

  @Post('{*segments}')
  postData(
    @Param('segments') segments: string | string[],
    @Res() res: Response,
    @Body() body: any,
  ) {
    const url = `auth/${Array.isArray(segments) ? segments.join('/') : segments}`;
    return res.status(200).json({ 'type' : 'form', 'all-succeed': true });

    //return res
    //   .status(400)
    //   .json({ 'type': 'failure-result', 'content':[] });
  }
}
