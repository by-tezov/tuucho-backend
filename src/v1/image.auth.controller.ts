import { Controller, Get, Param, Res, UseGuards, InternalServerErrorException } from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from './auth.guard';
import { ImageRepositoryService } from './image-repository.service';

@UseGuards(AuthGuard)
@Controller('v1/image/auth')
export class ImageAuthController {
  constructor(
      private readonly imageRepositoryService: ImageRepositoryService,
  ) {}

  @Get('{*segments}')
  async getImage(
    @Param('segments') segments: string | string[],
    @Res() res: Response,
  ) {
      const url = `auth/${Array.isArray(segments) ? segments.join('/') : segments}`;
      const delay = Math.floor(Math.random() * (5000 - 500)) + 500;
      console.log(`Delaying response for ${delay}ms`);
      setTimeout(async () => {
        try {
          const filePath = this.imageRepositoryService.resolveImagePath(url);
          const imageBuffer = await this.imageRepositoryService.read(filePath);
          const contentType = this.imageRepositoryService.resolveContentType(filePath)
          res.setHeader('Content-Type', contentType);
          res.setHeader('Content-Length', imageBuffer.length.toString());
          return res.end(imageBuffer);
        } catch (e: any) {
          throw new InternalServerErrorException('app indisponible');
        }
      }, delay);
  }

  
}
