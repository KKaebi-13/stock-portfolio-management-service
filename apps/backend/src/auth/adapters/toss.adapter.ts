import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { TossToken, TossTokenPort } from '../interfaces/toss-token.port';

@Injectable()
export class TossAdapter implements TossTokenPort {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async issueToken(): Promise<TossToken> {
    const clientId = this.configService.get<string>('TOSS_CLIENT_ID');
    const clientSecret = this.configService.get<string>('TOSS_CLIENT_SECRET');

    // 토스 API 가이드: application/x-www-form-urlencoded 필수
    const payload = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId || '',
      client_secret: clientSecret || '',
    });

    try {
      const response = await firstValueFrom(
        this.httpService.post('https://openapi.tossinvest.com/oauth2/token', payload, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })
      );

      return {
        accessToken: response.data.access_token,
        expiresIn: response.data.expires_in,
        tokenType: response.data.token_type,
      };
    } catch (error) {
      console.error('Toss API Error:', error);
      throw new InternalServerErrorException('토스증권 토큰 발급에 실패했습니다.');
    }
  }
}

