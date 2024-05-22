import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";
import { JwtAuthService } from "src/core/jwt/jwt-auth.service";

@Injectable()
export class GraphqlAuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtAuthService,
    ) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const gqlCtx = context.getArgByIndex(2);
        const request: Request = gqlCtx.req;

        const token = this.extractTokenFromCookie(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.decodeAccessToken(token);
            request['user'] = payload;

        } catch (error) {
            throw new UnauthorizedException();
        }
        return true
    }
    private extractTokenFromCookie(request: Request): string | undefined {
        return request.cookies?.access_token;
    }
}