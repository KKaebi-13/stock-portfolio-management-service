import { Inject, Injectable } from '@nestjs/common';
import { TOSS_TOKEN_PORT, type TossToken, type TossTokenPort } from './interfaces/toss-token.port';

@Injectable()
export class AuthService {
  private inMemoryToken: TossToken | null = null;

  constructor(
    @Inject(TOSS_TOKEN_PORT) 
    private readonly tossTokenPort: TossTokenPort,
  ) {}

  getStoredToken(): TossToken | null {
    return this.inMemoryToken;
  }

  async fetchAndStoreNewToken(): Promise<TossToken> {
    const newToken = await this.tossTokenPort.issueToken();
    this.inMemoryToken = newToken;
    return newToken;
  }
}

