import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFile } from './dto';

@Controller()
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const request = new UploadFile();
    request.file = file;
    request.filename = this.uploadService.generateFilename();

    return this.uploadService.uploadFile(request);
  }
}
