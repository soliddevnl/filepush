import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';

interface ResizeOptions {
  width: number;
  height: number;
}

@Injectable()
export class ResizeService {
  resize(image: Buffer, options: ResizeOptions): Promise<Buffer> {
    return sharp(image)
      .resize({
        width: options.width,
        height: options.height,
      })
      .toBuffer();
  }
}
