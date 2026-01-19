import { Controller, Param, Get, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import type { IncomingHttpHeaders } from 'http';
import { AuthGuardOptional } from './auth.guard-optional';

@UseGuards(AuthGuardOptional)
@Controller('v1/health')
export class HealthController {
  @Get('{*segments}')
  async getHealth(
    @Param('segments') segments: string | string[],
    @Res() res: Response,
  ) {
    const url = `${Array.isArray(segments) ? segments.join('/') : segments}`;

    return res.status(200).json({ health: '100%' });
  }
}
