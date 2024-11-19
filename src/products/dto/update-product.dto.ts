import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

// sử dụng PartialType giúp bạn khi cập nhất thì không cần phải truyền tất cả các trường, chỉ truyền các trường cần thiết mà thôi
// nếu không dùng PartialType thì bắt buột phải truyền tất cả các thuộc tính giống CreatedProductDto
export class UpdateProductDto extends PartialType(CreateProductDto) {}
