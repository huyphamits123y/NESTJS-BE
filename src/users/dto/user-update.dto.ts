import { UserSignUpDto } from "./user-signup.dto";
import { IsNotEmpty, MinLength, IsString, IsEmail } from "class-validator";
export class UserUpdateDto {
    @IsNotEmpty({ message: 'Name can not be null' })
    @IsString({ message: 'Name should be string' })
    name: string;



    @IsNotEmpty({ message: 'Password can not be empty' })
    @MinLength(5, { message: 'Password minium character should be 5.' })
    password: string;

}