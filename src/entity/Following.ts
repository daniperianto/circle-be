import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from './User';

@Entity({name: "followings"})
export class Following {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.followings)
    following_id: User

    @ManyToOne(() => User, (user) => user.followers)
    follower_id: User

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    created_at: Date

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    updated_at: Date

}