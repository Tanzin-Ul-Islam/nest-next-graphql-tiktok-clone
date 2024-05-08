import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import { JwtAuthService } from 'src/core/jwt/jwt-auth.service';

@Module({
  providers: [AuthService, JwtAuthService, PrismaService],
})
export class AuthModule { }
