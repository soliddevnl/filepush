export interface FileSystem {
  exists(path: string): boolean;

  remove(path: string): void;

  read(path: string): Buffer;

  write(path: string, data: Buffer): Promise<void>;
}
