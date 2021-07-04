import { UploadFileDto } from '../upload/dto';

export interface Uploader {
  upload(request: UploadFileDto): Promise<void>;
}
