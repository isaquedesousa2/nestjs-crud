import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'


@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @Column({ length: 100 })
    nome: string;

    @Column({ length: 100, unique: true })
    email: string;

    @Column({ length: 127 })
    password: string;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;
}