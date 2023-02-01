import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";
import * as bcryptjs from "bcryptjs"

@Entity("users")
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column("varchar", { length: 255, nullable: true })
    email: string | null;

    @Column("text", { nullable: true })
    password: string | null;

    @Column("boolean", { default: false })
    confirmed: boolean

    @Column("text", { nullable: true })
    googleId: string | null;

    @BeforeInsert()
    async hashPasswordBeforeInsert() {
        if (this.password) {
            this.password = await bcryptjs.hash(this.password, 10);
        }
    }

    @Column("boolean", { default: false })
    forgotPasswordLocked: boolean
}
