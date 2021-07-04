import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileDto } from './dto';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard('api-key'))
  async uploadFile(
    @Body() dto: UploadFileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    dto.file = file;
    dto.filename = this.uploadService.generateFilename();

    return await this.uploadService.uploadFile(dto);
  }
}
