import { Entity, PrimaryGeneratedColumn, ManyToOne, BaseEntity, Column } from 'typeorm';
import { Product } from './Products';
import { Cart } from './Cart';

@Entity("cartitem")
export class CartItem extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Product, (product) => product.cartItem, { onDelete: "CASCADE" })
    product: Product;

    @Column("int", { default: 1 })
    quantity: number

    @ManyToOne(() => Cart, (cart) => cart.items, { onDelete: "CASCADE" })
    cart: Cart;
}