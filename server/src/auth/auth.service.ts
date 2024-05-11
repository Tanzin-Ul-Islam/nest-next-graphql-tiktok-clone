import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { PrismaService } from "../prisma.service";
import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { compareHash, hashPassword } from 'src/utils/bcrypt.utils';
import { JwtAuthService } from 'src/core/jwt/jwt-auth.service';
@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtAuthService,
        private readonly prisma: PrismaService,
    ) { }

    async refreshToken(req: Request, res: Response): Promise<string> {
        const refreshToken = req.cookies("refresh_token");
        if (!refreshToken) {
            throw new UnauthorizedException('Refresh token not found')
        }
        let payload = undefined;
        try {
            payload = this.jwtService.decodeRefreshToken(refreshToken)
        } catch (error) {
            throw new UnauthorizedException("Invalid or expired refresh token.")
        }
        const userExist = await this.prisma.user.findUnique({
            where: { id: payload.sub }
        })
        if (!userExist) {
            throw new BadRequestException('User no longer exists');
        }
        const expireIn = 15000;
        const expiration = Math.floor(Date.now() / 1000) + expireIn;
        const accessToken = this.jwtService.generateAccessToken(payload, expiration)
        res.cookie('access_token', accessToken, { httpOnly: true });
        return accessToken;
    }

    private async issueTokens(user: User, res: Response) {
        const payload = { username: user.fullname, sub: user.id };
        const accessToken = this.jwtService.generateAccessToken(payload, '150sec')
        const refreshToken = this.jwtService.generateRefreshToken(payload, '7d')
        res.cookie('access_token', accessToken, { httpOnly: true });
        res.cookie('refresh_token', refreshToken, { httpOnly: true });
        return { user }
    }

    async validateUser(loginDto: LoginDto) {
        const user = await this.prisma.user.findUnique({
            where: { email: loginDto.email }
        })
        if (user && (await compareHash(loginDto.password, user.password))) {
            return user;
        }
        return null;
    }

    async register(registerDto: RegisterDto, res: Response) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: registerDto.email }
        })
        if (existingUser) {
            throw new BadRequestException({ email: "Email already in use." })
        }
        const hashedPassword = await hashPassword(registerDto.password);
        const user = await this.prisma.user.create({
            data: {
                fullname: registerDto.fullname,
                password: hashedPassword,
                email: registerDto.email,
            }
        })
        return this.issueTokens(user, res);
    }

    async login(loginDto: LoginDto, res: Response) {
        const user = await this.validateUser(loginDto);
        if (!user) {
            throw new BadRequestException({ invalidCredentials: 'Invalid credentials!' })
        }
        return this.issueTokens(user, res)
    }

    async logout(res: Response) {
        res.clearCookie('access_token');
        res.clearCookie('refresh_token');
        return 'Successfully logged out';
    }
}
