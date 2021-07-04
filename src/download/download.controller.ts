import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { DownloadService } from './download.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class DownloadController {
  constructor(private downloadService: DownloadService) {}

  @Get('/:filename')
  @UseGuards(AuthGuard('api-key'))
  async getFile(@Param('filename') filename: string, @Res() res: Response) {
    try {
      const file = await this.downloadService.downloadFile(filename);
      file.pipe(res);
    } catch (e) {
      console.log(e);
      throw new NotFoundException();
    }
  }
}
