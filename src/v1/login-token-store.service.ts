import { Injectable } from '@nestjs/common';

@Injectable()
export class LoginTokenStore {
  private token?: string;

  setToken(value: string) {
    this.token = value;
  }

  getToken(): string | undefined {
    return this.token;
  }

  clearToken() {
    this.token = undefined;
  }
}
