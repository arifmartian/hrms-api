import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Role {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 15 })
    name: string;

    // @Column({ nullable: true, default: new Date(), type: 'timestamp' })
    // created_at: Date;

    // @Column({ nullable: true, default: new Date(), type: 'timestamp' })
    // updated_At: Date;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", nullable: true })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)", nullable: true })
    updatedAt: Date;

    @OneToMany(() => User, user => user.role)
    users: User[];
}