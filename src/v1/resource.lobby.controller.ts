import {
  Controller,
  Get,
  Param,
  Res,
  InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';
import { ResourceRepositoryService } from './resource-repository.service';

@Controller('v1/resource/lobby')
export class ResourceLobbyController {
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
      ? `resource/auth/${before}-contextual-${after}`
      : `resource/auth/${before}-contextual`;
      
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
    const url = `resource/lobby/${Array.isArray(segments) ? segments.join('/') : segments}`;
    try {
      const filePath = this.resourceRepositoryService.resolveResourcePath(url);
      const data = await this.resourceRepositoryService.read(filePath);
      return res.json(data);
    } catch (e: any) {
      throw new InternalServerErrorException('app indisponible');
    }
  }
}
