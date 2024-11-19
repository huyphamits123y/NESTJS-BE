import { IsNotEmpty, MinLength, IsString, IsEmail } from "class-validator";
import { UserSignInDto } from "./user-signin.dto";

export class UserSignUpDto extends UserSignInDto {
    @IsNotEmpty({ message: 'Name can not be null' })
    @IsString({ message: 'Name should be string' })
    name: string;

    // @IsNotEmpty({ message: 'Email can not be null' })
    // @IsEmail({}, { message: 'Please provide a valid email.' })
    // email: string;

    // @IsNotEmpty({ message: 'Password can not be empty' })
    // @MinLength(5, { message: 'Password minium character should be 5.' })
    // password: string;
}