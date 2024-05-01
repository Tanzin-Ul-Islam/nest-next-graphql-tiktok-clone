import { InputType, Field } from "@nestjs/graphql"
import { IsEmail, IsNotEmpty, MinLength } from "class-validator"

@InputType()
export class RegisterDto {
    @Field()
    @IsNotEmpty({ message: "Fullname is required" })
    fullname: string;

    @Field()
    @IsNotEmpty({ message: 'Password is required.' })
    @MinLength(8, { message: "Password must be atleast 8 characters." })
    password: string;

    @Field()
    @IsNotEmpty({ message: 'Confirm password is required.' })
    confirmPassword: string;

    @Field()
    @IsNotEmpty({ message: 'Email is required.' })
    @IsEmail({}, { message: 'Email must be valid.' })
    email: string;
}

@InputType()
export class LoginDto {

    @Field()
    @IsNotEmpty({ message: 'Email is required.' })
    @IsEmail({}, { message: 'Email must be valid.' })
    email: string;

    @Field()
    @IsNotEmpty({ message: 'Password is required.' })
    @MinLength(8, { message: "Password must be atleast 8 characters." })
    password: string;

}