import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, IsNull } from 'typeorm'


@Entity({ name: "users" })
export class UserEntity {

    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @Column({ length: 100 })
    nome: string;

    @Column({ length: 100, unique: true })
    email: string;

    @Column({ length: 127 })
    password: string;

    @Column({ type: 'date', nullable: true})
    birthAt: string;

    @Column({ type: 'int', default: '1'})
    role: number

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;
}