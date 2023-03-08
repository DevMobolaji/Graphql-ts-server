import { Entity, PrimaryGeneratedColumn, ManyToOne, BaseEntity, OneToMany } from 'typeorm';
import { CartItem } from './cartItem';
import { User } from './User';

@Entity("cart")
export class Cart extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => User, user => user.carts)
    user: User;

    @OneToMany(() => CartItem, (cartitem) => cartitem.cart)
    items: CartItem[];

    // Getter method to calculate subtotal and total
    getSubtotalAndTotal() {
        let subtotal = 0;
        for (let item of this.items) {
            subtotal += item.product.price * item.quantity;
        }
        return subtotal
        //this.subtotal = subtotal;
        //this.total = this.subtotal * 1.13; // assuming 13% tax
    }
}
