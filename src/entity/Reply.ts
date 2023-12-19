import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm"
import { User } from "./User"
import { Thread } from "./Thread"

@Entity({name: "replies"})
export class Reply {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.replies)
    user: User

    @ManyToOne(() => Thread, (thread) => thread.replies)
    thread: Thread

    @Column()
    content: string

    @Column()
    image: string

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    created_at: Date

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    updated_at: Date
}