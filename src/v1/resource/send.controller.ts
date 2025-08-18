import { Controller, Get, Post, Query, Res, Body } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Controller('send')
export class SendController {

  @Post()
  postData(
    @Query('version') version: string,
    @Query('url') url: string,
    @Body() body: any,
    @Res() res: Response
  ) {

    console.log(`received data with version=${version}, url=${url}`)
    console.log(`data: ${JSON.stringify(body)}`)

    return res.status(200).json({ 'isAllSuccess': true });
    
    //return res
    //   .status(400)
    //   .json({ 'isSuccess': false, 'error-reasons': "some error stuff to do" });

  }

}
