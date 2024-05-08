import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma.service';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';

@Module({
  providers: [ UserResolver, AuthService, UserService, ConfigService, PrismaService]
})
export class UserModule {}
