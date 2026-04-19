import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";

@Entity('task')
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 50 })
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({type: 'boolean', default: false })
    isCompleted: boolean;


    //Relacion
    @ManyToOne(() => User, (user) => user.task, { nullable: false })
    @JoinColumn({ name: 'user_id' })
    user: User;
}
