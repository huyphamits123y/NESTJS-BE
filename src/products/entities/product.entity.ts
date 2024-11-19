import { UpdateCategoryDto } from "src/categories/dto/update-category.dto";
import { CategoryEntity } from "src/categories/entities/category.entity";
import { OrdersProductsEntity } from "src/orders/entities/orders-products.entity";
import { ReviewEntity } from "src/reviews/entities/review.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";


@Entity({ name: 'products' })
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    description: string;
    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    price: number;
    @Column()
    stock: number;
    @Column('simple-array')
    images: string[];
    @CreateDateColumn()
    createdAt: Timestamp;
    @UpdateDateColumn()
    updatedAt: Timestamp;

    @ManyToOne(() => UserEntity, (user) => user.products)
    addedBy: UserEntity;
    @ManyToOne(() => CategoryEntity, (cat) => cat.products)
    category: CategoryEntity;

    @OneToMany(() => ReviewEntity, (rev) => rev.product)
    reviews: ReviewEntity[];

    @OneToMany(() => OrdersProductsEntity, (op) => op.product)
    products: OrdersProductsEntity[];


}
