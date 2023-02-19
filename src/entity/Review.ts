import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Product } from "./Products"
import { User } from "./User"

@Entity("review")
export class Review extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column("varchar", { length: 255 })
    title: string

    @Column()
    comment: string

    @Column({ type: "int" })
    rating: Number

    @ManyToOne(() => Product, (product) => product.reviews)
    product: Product

    @ManyToOne(() => User, (user) => user.reviews)
    user: User


    // @BeforeUpdate()
    // updateTimestamp() {
    //     this.updated_at = new Date;
    // }

    // @CreateDateColumn()
    // created_at: Date; // Creation date

    // @UpdateDateColumn()
    // updated_at: Date; // Last updated date
}