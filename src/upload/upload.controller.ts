import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadDto } from './upload.dto';

@Controller()
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  uploadImages(@UploadedFile() file: Express.Multer.File) {
    const request = new UploadDto();
    request.file = file;

    return this.uploadService.uploadImage(request);
  }
}
