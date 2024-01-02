import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { User } from './User';

@Entity({name: "follows"})
export class Follows {
    @ManyToOne(() => User, (user) => user.following, {
        cascade: true, onDelete: 'CASCADE'
    })
    @JoinColumn({name: "following_id"})
    @PrimaryColumn({type: "integer"})
    following_id: User

    @ManyToOne(() => User, (user) => user.followers, {
        cascade: true, onDelete: 'CASCADE'
    })
    @JoinColumn({name: "followers_id"})
    @PrimaryColumn({type: "integer"})
    followers_id: User

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    created_at: Date

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    updated_at: Date

}