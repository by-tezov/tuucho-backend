import { Injectable } from '@nestjs/common';

@Injectable()
export class LoginTokenStore {
  private tokens = new Map<string, string>();
  
  setToken(platform: string, token: string) {
    this.tokens.set(platform, token);
  }

  isValid(token: string): boolean {
    for (const tokenStored of this.tokens.values()) {
      if (tokenStored === token) return true;
    }
    return false;
  }

}
