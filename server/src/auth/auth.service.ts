import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma.service";
import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { compareHash, hashPassword } from 'src/utils/bcrypt.utils';
@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
        private readonly configService: ConfigService,
    ) { }

    async refreshToken(req: Request, res: Response): Promise<string> {
        const refreshToken = req.cookies("refresh_token");
        if (!refreshToken) {
            throw new UnauthorizedException('Refresh token not found')
        }
        let payload;
        try {
            payload = this.jwtService.verify(refreshToken, {
                secret: this.configService.get<string>('REFRESH_TOKEN_SECRET')
            })
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
        const accessToken = this.jwtService.sign(
            { ...payload, exp: expiration },
            {
                secret: this.configService.get<string>('ACCESS_TOKEN_SECRET')
            }
        )
        res.cookie('access_token', accessToken, { httpOnly: true });
        return accessToken;
    }

    private async issueTokens(user: User, res: Response) {
        const payload = { username: user.fullname, sub: user.id };
        const accessToken = this.jwtService.sign(
            { ...payload },
            {
                secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
                expiresIn: '150sec',
            }
        )
        const refreshToken = this.jwtService.sign(
            { ...payload },
            {
                secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
                expiresIn: '7d',
            }
        )
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

    async register(registerDto: RegisterDto, res: Response){
        const existingUser = await this.prisma.user.findUnique({
            where: {email: registerDto.email}
        })
        if(existingUser){
            throw new Error("Email already in use.")
        }
        const hashedPassword = await hashPassword(registerDto.password);
        const user = await this.prisma.user.create({
            data: {
                fullname: registerDto.fullname,
                password: registerDto.password,
                email: registerDto.email,
            }
        })
        return this.issueTokens(user, res);
    }

    async login(loginDto: LoginDto, res: Response){
        const user = await this.validateUser(loginDto);
        if(!user){
            throw new UnauthorizedException('Invalid credentials.')
        }
        return this.issueTokens(user, res)
    }

    async logout(res: Response){
        res.clearCookie('access_token');
        res.clearCookie('refresh_token');
        return 'Successfully logged out';
    }
}
