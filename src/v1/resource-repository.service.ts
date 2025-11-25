import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ResourceRepositoryService {
  read(filePath: string): Promise<any> {
    return new Promise((resolve, reject) => {

      /*if(filePath.includes("login")) {
        return reject(new Error('resource not found'));
      }*/

      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          return reject(new Error('resource not found'));
        }

        try {
          const parsed = JSON.parse(data);
          resolve(parsed);
        } catch {
          reject(new Error('invalid JSON format'));
        }
      });
    });
  }

  resolveResourcePath(url: string): string {
    return path.join(__dirname, `res/`, `${url}.json`);
  }
}
