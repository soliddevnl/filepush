import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { DownloadImage, UploadImage } from './dto';

@Controller()
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  uploadImages(@UploadedFile() file: Express.Multer.File) {
    const request = new UploadImage();
    request.file = file;
    request.filename = this.uploadService.generateFilename();

    return this.uploadService.uploadImage(request);
  }

  @Get('/:filename')
  async getImage(
    @Param('filename') filename: string,
    @Query() query: DownloadImage,
    @Res() res: Response,
  ) {
    const image = await this.uploadService.getImage({
      filename: filename,
      width: query.width ? parseInt(query.width.toString()) : undefined,
      height: query.height ? parseInt(query.height.toString()) : undefined,
    });

    if (image === null) {
      throw new NotFoundException();
    }

    res.contentType('image/jpeg');
    res.send(image);
  }
}
