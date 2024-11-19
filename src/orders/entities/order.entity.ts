import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { OrderStatus } from "../enums/order-status.enum";
import { UserEntity } from "src/users/entities/user.entity";
import { ShippingEntity } from "./shipping.entity";
import { OrdersProductsEntity } from "./orders-products.entity";

@Entity({ name: "orders" })
export class OrderEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @CreateDateColumn()
    orderAt: Timestamp;
    @Column({ type: "enum", enum: OrderStatus, default: OrderStatus.PROCESSING })
    status: string;
    @Column({ nullable: true }) // 
    shippedAt: Date;
    @Column({ nullable: true }) // Tùy chọn này cho phép cột deliveredAt có thể chứa giá trị null trong cơ sở dữ liệu.
    deliveredAt: Date;
    @ManyToOne(() => UserEntity, (user) => user.ordersUpdateBy)
    updatedBy: UserEntity;

    @OneToOne(() => ShippingEntity, (ship) => ship.order, { cascade: true })
    @JoinColumn() // Dùng để chỉ định cột nào trong bảng orders sẽ lưu khóa ngoại tham chiếu đến bảng shipping (bảng địa chỉ giao hàng).
    shippingAddress: ShippingEntity;

    @OneToMany(() => OrdersProductsEntity, (op) => op.order, { cascade: true })
    products: OrdersProductsEntity[];

    @ManyToOne(() => UserEntity, (user) => user.orders)
    user: UserEntity;
}


