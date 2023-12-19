import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Thread } from "./Thread"
import { Like } from "./Like"
import { Following } from "./Following"
import { Reply } from "./Reply"

@Entity({name: "users"})
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    username: string

    @Column()
    fullname: string

    @Column({unique: true})
    email: string

    @Column()
    password: string

    @Column({nullable: true})
    photo_profile: string

    @Column({nullable: true})
    bio: string

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    created_at: Date

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    updated_at: Date

    @OneToMany(() => Thread, (thread) => {
        thread.created_by
        thread.updated_by
    })
    threads: Thread

    @OneToMany(() => Like, (like) => {
        like.user
        // like.created_by
        // like.updated_by
    })
    likes: Like

    @OneToMany(() => Following, (following) => {
        following.following_id
    })
    followings: Following

    @OneToMany(() => Following, (following) => {
        following.follower_id
    })
    followers: Following

    @OneToMany(() => Reply, (reply) => {
        reply.user
    })
    replies: Reply

}
