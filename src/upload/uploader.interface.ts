import { UploadFile } from '../upload/dto';

export interface Uploader {
  upload(request: UploadFile): Promise<void>;
}
