import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm"
import { User } from "./User"
import { Thread } from "./Thread"

@Entity({name: "replies"})
export class Reply {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.replies, {
        cascade: true, onDelete: "CASCADE"
    })
    user: User

    @ManyToOne(() => Thread, (thread) => thread.replies, {
        cascade: true, onDelete: "CASCADE"
    })
    thread: Thread

    @Column()
    content: string

    @Column({nullable: true})
    image: string

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    created_at: Date

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    updated_at: Date
}