import { BaseEntity, BeforeUpdate, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Category } from "./Category"
import { User } from "./User"
import { Review } from "./Review"
import { CartItem } from "./cartItem"


@Entity("products")
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column("varchar", { length: 255 })
    name: string

    @Column({ type: "float" })
    price: number

    @Column("text")
    description: string

    @Column("text")
    image: string

    @Column("int")
    quantity: number

    @Column("boolean", { default: true })
    onSale: boolean

    @BeforeUpdate()
    updateTimestamp() {
        this.updated_at = new Date;
    }

    @CreateDateColumn()
    created_at: Date; // Creation date

    @UpdateDateColumn()
    updated_at: Date; // Last updated date

    @ManyToOne(() => Category, (category) => category.products, { onDelete: "SET NULL" })
    category: Category

    @ManyToOne(() => User, (user) => user.products)
    user: User

    @OneToMany(() => Review, (review) => review.product)
    reviews: Review[]

    @OneToMany(() => CartItem, (cartItem) => cartItem.product)
    cartItem: CartItem;
}                                                                               