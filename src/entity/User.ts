import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, BeforeUpdate } from "typeorm";
import * as bcryptjs from "bcryptjs"

@Entity("users")
export class User extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column("varchar", { length: 255 })
    email: string

    @Column("text")
    password: string

    @Column("boolean", { default: false})
    confirmed: boolean

    @BeforeUpdate()
    async hashPasswordBeforeUpdate() {
        if (this.password) {
            this.password = await bcryptjs.hash(this.password, 10)
        }
    }

    @Column("boolean", { default: false})
    forgotPasswordLocked: boolean
}
