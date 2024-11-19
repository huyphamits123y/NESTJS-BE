import { IsNotEmpty, MinLength, IsString, IsEmail } from "class-validator";

export class UserSignInDto {


    @IsNotEmpty({ message: 'Email can not be null' })
    @IsEmail({}, { message: 'Please provide a valid email.' })
    email: string;

    @IsNotEmpty({ message: 'Password can not be empty' })
    @MinLength(5, { message: 'Password minium character should be 5.' })
    password: string;
}