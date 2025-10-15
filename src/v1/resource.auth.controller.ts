import {
  Controller,
  Get,
  Param,
  Res,
  Headers,
  UseGuards,
  InternalServerErrorException,
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
  getResourceContextual(
    @Param('segmentsBefore') segmentsBefore: string | string[],
    @Param('segmentsAfter') segmentsAfter: string | string[],
    @Res() res: Response,
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

    const delay = Math.floor(Math.random() * (5000 - 500)) + 500;

    console.log(`Delaying response for ${delay}ms`);

    setTimeout(async () => {
      try {
        const filePath =
          this.resourceRepositoryService.resolveResourcePath(url);
        const data = await this.resourceRepositoryService.read(filePath);
        return res.json(data);
      } catch (e: any) {
        throw new InternalServerErrorException('app indisponible');
      }
    }, delay);
  }

  @Get('{*segments}')
  async getResource(
    @Param('segments') segments: string | string[],
    @Res() res: Response,
  ) {
    const url = `auth/${Array.isArray(segments) ? segments.join('/') : segments}`;

    try {
      const filePath = this.resourceRepositoryService.resolveResourcePath(url);
      const data = await this.resourceRepositoryService.read(filePath);
      return res.json(data);
    } catch (e: any) {
      throw new InternalServerErrorException('app indisponible');
    }
  }
}
