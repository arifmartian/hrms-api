import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity({ name: 'roles' })  // table name
export class Role {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 15 })
    name: string;

    @Column({ type: 'enum', enum: ['ACTIVE', 'INACTIVE'], default: "ACTIVE" })
    status: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", nullable: true })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)", nullable: true })
    updatedAt: Date;

    @OneToMany(() => User, user => user.role)   // role relation with user table
    users: User[];
}