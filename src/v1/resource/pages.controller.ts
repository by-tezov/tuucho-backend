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
    @Query('name') name: string, 
    @Res() res: Response
  ) {
      const filePath = path.join(__dirname, `../../res/${version}`, `${name}.json`);
      this.readFile(filePath, res);
  }

  @Post()
  postData(
    @Body() body: { version: string, name: string },
    @Res() res: Response
  ) {
    const filePath = path.join(__dirname, `../../res/${body.version}`, `${body.name}.json`);
    this.readFile(filePath, res);
  }

}
