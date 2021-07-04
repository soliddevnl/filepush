import { Type } from 'class-transformer';

export class UploadFileDto {
  filename: string;
  file: Express.Multer.File;
  @Type(() => Number)
  height?: number;
  @Type(() => Number)
  width?: number;
}
