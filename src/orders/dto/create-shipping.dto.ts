import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateShippingDto {

    @IsNotEmpty({ message: 'Phone can not be empty' })
    @IsString({ message: 'Phone format should be string' })
    phone: string;

    @IsOptional()
    @IsString({ message: 'Name format should be string' })
    name: string;


    @IsNotEmpty({ message: 'address can not be empty' })
    @IsString({ message: 'Address format should be string' })
    address: string;


    @IsNotEmpty({ message: 'City can not be empty' })
    @IsString({ message: 'City format should be string' })
    city: string;


    @IsNotEmpty({ message: 'postCode can not be empty' })
    @IsString({ message: 'poseCode format should be string' })
    postCode: String;


    @IsNotEmpty({ message: 'State can not be empty' })
    @IsString({ message: 'State format should be string' })
    state: string;


    @IsNotEmpty({ message: 'Country can not be empty' })
    @IsString({ message: 'Country format should be string' })
    country: string;
}
