import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtAuthService {
    constructor(private jwtService: JwtService) { }

    generateAccessToken(arg: any, expTime: any) {
        const token = this.jwtService.sign(arg, { secret: process.env.ACCESS_TOKEN_SECRET, expiresIn: expTime ? expTime : '30d' });
        return token;
    }

    decodeAccessToken(token: string) {
        try {
            const response = this.jwtService.verify(token, { secret: process.env.ACCESS_TOKEN_SECRET });
            return response;
        } catch (error) {
            return;
        }
    }

    generateRefreshToken(arg: any, expTime: any) {
        const token = this.jwtService.sign(arg, { secret: process.env.REFRESH_TOKEN_SECRET, expiresIn: expTime ? expTime : '30d' });
        return token;
    }

    decodeRefreshToken(token: string) {
        try {
            const response = this.jwtService.verify(token, { secret: process.env.REFRESH_TOKEN_SECRET });
            return response;
        } catch (error) {
            return;
        }
    }

}