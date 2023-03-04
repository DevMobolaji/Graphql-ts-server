import { Entity, PrimaryGeneratedColumn, ManyToOne, BaseEntity, OneToMany } from 'typeorm';
import { CartItem } from './cartItem';
import { User } from './User';

@Entity("cart")
export class Cart extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => User, user => user.carts)
    user: User;

    @OneToMany(() => CartItem, (cartitem) => cartitem.cart, {
        cascade: true,
        eager: true,
    })
    items: CartItem[];
}
