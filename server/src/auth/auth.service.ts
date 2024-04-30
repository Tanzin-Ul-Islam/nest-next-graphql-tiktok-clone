import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma.service";
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
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
        if(!userExist){
            throw new BadRequestException('User no longer exists');
        }
        const expireIn = 15000;
        const expiration = Math.floor(Date.now()/1000) + expireIn;
        const accessToken = this.jwtService.sign(
            {...payload, exp: expiration},
            {
                secret: this.configService.get<string>('ACCESS_TOKEN_SECRET')
            }
        )
        res.cookie('access_token', accessToken, {httpOnly: true});
        return accessToken;
    }
}
