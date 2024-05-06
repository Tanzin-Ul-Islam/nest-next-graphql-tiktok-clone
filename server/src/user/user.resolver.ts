import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from './user.service';
import { LoginResponse, RegisterResponse } from 'src/auth/dto/response.dto';
import { LoginDto, RegisterDto } from 'src/auth/dto/auth.dto';
import { BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';

@Resolver()
export class UserResolver {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) { }

    @Mutation(() => RegisterResponse)
    async register(
        @Args('registerInput') registerDto: RegisterDto,
        @Context() context: { res: Response },
    ): Promise<RegisterResponse> {
        if (registerDto.password !== registerDto.confirmPassword) {
            throw new BadRequestException({
                confirmPassword: "Password and confirm password are not the same",
            })
        }
        try {
            const { user } = await this.authService.register(
                registerDto,
                context.res
            );
            return { user };
        } catch (error) {
            return {
                error: {
                    message: error.message
                }
            }
        }
    }

    @Mutation(() => LoginResponse)
    async login(
        @Args('loginInput') loginDto: LoginDto,
        @Context() Context: { res: Response }
    ) {
        return this.authService.login(loginDto, Context.res)
    }

    @Mutation(() => LoginResponse)
    async logout(
        @Context() Context: { res: Response }
    ) {
        return this.authService.logout(Context.res)
    }

    @Mutation(()=>String)
    async refreshToken(@Context() Context: {req: Request, res: Response}){
        try{
            return this.authService.refreshToken(Context.req, Context.res)
        }catch(error){
            throw new BadRequestException(error.message);
        }
    }
}
