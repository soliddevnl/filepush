import { UploadImage } from './dto';

export interface Uploader {
  upload(request: UploadImage): Promise<void>;
}
