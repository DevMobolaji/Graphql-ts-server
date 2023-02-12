import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Product } from "./Products"

@Entity("category")
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column("varchar", { length: 255 })
    name: string

    @OneToMany(() => Product, (product) => product.category)
    products: Product[]
}