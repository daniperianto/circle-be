
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp } from "typeorm"
import { User } from "./User"
import { Like } from './Like';
import { Reply } from "./Reply";

@Entity({name: "threads"})
export class Thread {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @Column()
    image: string

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    created_at: Date

    @ManyToOne(() => User, (user) => user.threads, {
        cascade: true, onDelete: 'SET NULL'
    })
    created_by: User

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    updated_at: Date

    @ManyToOne(() => User, (user) => user.threads, {
        cascade: true, onDelete: 'SET NULL'
    })
    updated_by: User

    @OneToMany(() => Like, (like) => like.thread)
    likes: Like

    @OneToMany(() => Reply, (reply) => reply.thread)
    replies: Reply

    

}