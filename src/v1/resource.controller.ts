import { Controller, Get, Post, Query, Res, Body } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Controller('resource')
export class ResourceController {

  private readFile(filePath: string, res: Response) {
      fs.readFile(filePath, 'utf8', (err, data) => {
          if (err) {
          return res.status(500).json({ error: 'resource not found' });
          }
          return res.json(JSON.parse(data));
      });
  }

  @Get()
  getResource(
    @Query('version') version: string, 
    @Query('url') url: string, 
    @Res() res: Response
  ) {
      console.log(`request resource version=${version}, url=${url}`)

      const filePath = path.join(__dirname, `../res/${version}`, `${url}.json`);
      if (url.endsWith('-contextual') || url.includes('-contextual-')) {
        const delay = Math.floor(Math.random() * (5000 - 500)) + 500;
        console.log(`Delaying response for ${delay}ms`);
        setTimeout(() => {
          this.readFile(filePath, res);
        }, delay);
      } else {
        this.readFile(filePath, res);
      }
  }

}
