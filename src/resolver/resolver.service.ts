import { Injectable } from '@nestjs/common';
import { S3ResolverService } from '../resolver-s3/s3-resolver.service';

export interface Resolver {
  isStored(path: string): Promise<boolean>;

  resolve(path: string): Promise<string>;

  store(data: Buffer, path: string): Promise<void>;

  remove(paths: Array<string>): Promise<void>;
}

@Injectable()
export class ResolverService {
  private resolvers: Array<Resolver> = [];

  constructor(s3Resolver: S3ResolverService) {
    this.resolvers.push(s3Resolver);
  }

  async resolve(path: string): Promise<string> {
    for (const resolver of this.resolvers) {
      const isStored = await resolver.isStored(path);
      if (isStored) {
        return await resolver.resolve(path);
      }
    }

    throw `Could not resolve file ${path}`;
  }
}
