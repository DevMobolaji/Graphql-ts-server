import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Category } from "./Category"

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

    @CreateDateColumn()
    created_at: Date; // Creation date

    @UpdateDateColumn()
    updated_at: Date; // Last updated date

    @ManyToOne(() => Category, (category) => category.products)
    category: Category
}