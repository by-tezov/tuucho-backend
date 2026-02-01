import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ImageRepositoryService {
  private readonly contentTypes: Record<string, string> = {
    svg: 'image/svg+xml',
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    gif: 'image/gif',
    webp: 'image/webp',
  };

  read(filePath: string): Promise<any> {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          return reject(new Error('resource not found'));
        }

        try {
          resolve(data);
        } catch {
          reject(new Error('invalid image format'));
        }
      });
    });
  }

  resolveImagePath(url: string): string {
    const basePath = path.join(__dirname, url);
    const urlExt = path.extname(url).toLowerCase().replace('.', '');

    if (urlExt) {
      if (fs.existsSync(basePath)) {
        return basePath;
      }
      for (const ext of Object.keys(this.contentTypes)) {
        const fullPath = `${basePath}.${ext}`;
        if (fs.existsSync(fullPath)) {
          return fullPath;
        }
      }
      const basePathWithoutExt = basePath.substring(
        0,
        basePath.lastIndexOf('.'),
      );
      for (const ext of Object.keys(this.contentTypes)) {
        const fullPath = `${basePathWithoutExt}.${ext}`;
        if (fs.existsSync(fullPath)) {
          return fullPath;
        }
      }
    } else {
      for (const ext of Object.keys(this.contentTypes)) {
        const fullPath = `${basePath}.${ext}`;
        if (fs.existsSync(fullPath)) {
          return fullPath;
        }
      }
    }
    throw new Error('resource not found');
  }

  resolveContentType(filePath: string): string {
    const ext = filePath.split('.').pop()?.toLowerCase();
    if (!ext || !this.contentTypes[ext]) {
      throw new Error('invalid image format');
    }
    return this.contentTypes[ext];
  }
}
