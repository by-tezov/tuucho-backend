import { Controller, Get, Param, Res, Headers } from '@nestjs/common';
import { Response } from 'express';
import type { IncomingHttpHeaders } from 'http';
import { ResourceRepositoryService } from './resource-repository.service';

@Controller('v1/resource/lobby')
export class ResourceLobbyController {
  constructor(
    private readonly resourceRepositoryService: ResourceRepositoryService,
  ) {}

  @Get('contextual/{*segments}')
  getContextual(
    @Param('segments') segments: string | string[],
    @Res() res: Response,
    @Headers() headers: IncomingHttpHeaders,
  ) {
    const url = `lobby/contextual/${Array.isArray(segments) ? segments.join('/') : segments}`;
    console.log(`request resource version=v1, url=${url}`);
    console.log('headers:', headers);

    const delay = Math.floor(Math.random() * (5000 - 500)) + 500;
    console.log(`Delaying response for ${delay}ms`);

    setTimeout(async () => {
      try {
        const filePath =
          this.resourceRepositoryService.resolveResourcePath(url);
        const data = await this.resourceRepositoryService.read(filePath);
        return res.json(data);
      } catch (e: any) {
        return res
          .status(500)
          .json({ error: e.message, reason: 'app indisponible' });
      }
    }, delay);
  }

  @Get('{*segments}')
  async getResource(
    @Param('segments') segments: string | string[],
    @Res() res: Response,
    @Headers() headers: IncomingHttpHeaders,
  ) {
    const url = `lobby/${Array.isArray(segments) ? segments.join('/') : segments}`;
    console.log(`request resource version=v1, url=${url}`);

    try {
      const filePath = this.resourceRepositoryService.resolveResourcePath(url);
      const data = await this.resourceRepositoryService.read(filePath);
      return res.json(data);
    } catch (e: any) {
      return res
        .status(500)
        .json({ error: e.message, reason: 'app indisponible' });
    }
  }
}
