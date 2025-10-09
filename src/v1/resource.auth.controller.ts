import {
  Controller,
  Get,
  Param,
  Res,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import type { IncomingHttpHeaders } from 'http';
import { ResourceRepositoryService } from './resource-repository.service';
import { AuthGuard } from './auth.guard';

@UseGuards(AuthGuard)
@Controller('v1/resource/auth')
export class ResourceAuthController {
  constructor(
    private readonly resourceRepositoryService: ResourceRepositoryService,
  ) {}

  @Get('{*segmentsBefore}-contextual-{*segmentsAfter}')
  @Get('{*segments}-contextual')
  getContextualCustom(
    @Param('segmentsBefore') segmentsBefore: string | string[],
    @Param('segmentsAfter') segmentsAfter: string | string[],
    @Res() res: Response,
    @Headers() headers: IncomingHttpHeaders,
  ) {
    const before = Array.isArray(segmentsBefore)
      ? segmentsBefore.join('/')
      : (segmentsBefore ?? '');
    const after = Array.isArray(segmentsAfter)
      ? segmentsAfter.join('/')
      : (segmentsAfter ?? '');

    const url = after
      ? `auth/${before}-contextual-${after}`
      : `auth/${before}-contextual`;

    console.log(`request resource version=v1, url=${url}`);
    console.log('headers:', headers['authorization']);

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
    const url = `auth/${Array.isArray(segments) ? segments.join('/') : segments}`;
    console.log(`request resource version=v1, url=${url}`);
    console.log('headers:', headers['authorization']);

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
