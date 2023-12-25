import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from './User';

@Entity({name: "followings"})
export class Following {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.followings, {
        cascade: true, onDelete: 'CASCADE'
    })
    @JoinColumn({name: "following_id"})
    following_id: User

    @ManyToOne(() => User, (user) => user.followers, {
        cascade: true, onDelete: 'CASCADE'
    })
    @JoinColumn({name: "followers_id"})
    follower_id: User

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    created_at: Date

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    updated_at: Date

}