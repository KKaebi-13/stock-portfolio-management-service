import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TossAdapter } from './adapters/toss.adapter';
import { TOSS_TOKEN_PORT } from './interfaces/toss-token.port';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: TOSS_TOKEN_PORT,
      useClass: TossAdapter, // 인터페이스를 실제 어댑터와 연결!
    },
  ],
})
export class AuthModule {}

