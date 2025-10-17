import { Injectable } from '@nestjs/common';

@Injectable()
export class LoginTokenStore {
  private tokens = new Map<string, string>();
  
  setToken(platform: string, token: string) {
    this.tokens.set(platform.toLowerCase(), token);
  }

  isValid(token: string): boolean {
    for (const stored of this.tokens.values()) {
      if (stored === token) return true;
    }
    return false;
  }

}
