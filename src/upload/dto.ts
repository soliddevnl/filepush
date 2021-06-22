export class DownloadImage {
  public filename: string;
  public height?: number;
  public width?: number;
}

export class UploadImage {
  public filename: string;
  public file: Express.Multer.File;
}
