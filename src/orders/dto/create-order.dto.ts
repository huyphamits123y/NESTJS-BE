import { Type } from "class-transformer";
import { CreateShippingDto } from "./create-shipping.dto";
import { ValidateNested } from "class-validator";
import { OrderedProductsDto } from "./ordered-products.dto";

export class CreateOrderDto {
    @Type(() => CreateShippingDto)
    @ValidateNested() // @ValidateNested() là một decorator của class-validator dùng để kiểm tra tính hợp lệ của các đối tượng con (nested objects).
    shippingAddress: CreateShippingDto;

    @Type(() => OrderedProductsDto)
    @ValidateNested()
    orderedProducts: OrderedProductsDto[];
}
