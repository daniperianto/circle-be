import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Thread } from "./Thread";

@Entity({name: "likes"})
export class Like {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.likes)
    user: User

    @ManyToOne(() => Thread, (thread) => thread.likes)
    thread: Thread

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    created_at: Date

    @ManyToOne(() => User, (user) => user.likes)
    created_by: User

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    updated_at: Date

    @ManyToOne(() => User, (user) => user.likes)
    updated_by: User

}