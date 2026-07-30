import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('token')
  getToken() {
    const token = this.authService.getStoredToken();
    if (!token) {
      return { status: '토큰 미발급', data: null };
    }
    return { status: '발급 완료', data: token };
  }

  @Post('token')
  async issueToken() {
    const token = await this.authService.fetchAndStoreNewToken();
    return { status: '발급 성공', data: token };
  }
}

