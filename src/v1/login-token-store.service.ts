import { Injectable } from '@nestjs/common';

@Injectable()
export class LoginTokenStore {
  private tokens = new Map<string, string>();
  
  setToken(login: string, token: string) {
    this.tokens.set(login, token);
  }

  isValid(token: string): boolean {
    for (const tokenStored of this.tokens.values()) {
      if (tokenStored === token) return true;
    }
    return false;
  }

}
