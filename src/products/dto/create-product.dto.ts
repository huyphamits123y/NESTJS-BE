import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';  // Import class-transformer
export class CreateProductDto {
    @IsNotEmpty({ message: 'title can not be null' })
    @IsString({ message: 'title must be a string' })
    title: string;

    @IsNotEmpty({ message: 'description can not be null' })
    @IsString({ message: 'description must be a string' })
    description: string;

    @IsNotEmpty({ message: 'price can not be null' })
    @Type(() => Number)  // Ép kiểu từ chuỗi sang số
    @IsNumber({ maxDecimalPlaces: 2 }, { message: 'price should be a number & max decimal precision 2' })
    @IsPositive({ message: 'price should be a positive number' })
    price: number;




    @IsNotEmpty({ message: 'stock can not be null' })
    @IsNumber({}, { message: 'stock should be number' })
    @Type(() => Number)
    @Min(0, { message: 'stock can not be negative' })
    stock: number;

    @IsNotEmpty({ message: 'images should not be empty' })
    @IsArray({ message: 'images should be in array format' })
    images: string[];

    @IsNotEmpty({ message: 'category should not be empty' })
    @IsNumber({}, { message: 'category id should be number' })
    @Type(() => Number)
    categoryId: number;
}
