import { Module, forwardRef } from '@nestjs/common'; // Ensure you import Module
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service'; // Ensure you import OrdersService
import { OrderEntity } from './entities/order.entity';
import { OrdersProductsEntity } from './entities/orders-products.entity';
import { ShippingEntity } from './entities/shipping.entity';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, OrdersProductsEntity, ShippingEntity]), forwardRef(() => ProductsModule)],
  controllers: [OrdersController],
  providers: [OrdersService], // Add a comma here if missing
  exports: [OrdersService]
})
export class OrdersModule { }
