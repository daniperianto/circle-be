import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { User } from "./User";
import { Thread } from "./Thread";

@Entity({name: "likes"})
@Unique(['user', 'thread'])
export class Like {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.likes )

    user: User

    @ManyToOne(() => Thread, (thread) => thread.likes)
    thread: Thread

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    created_at: Date

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    updated_at: Date


}