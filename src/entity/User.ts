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

    @Column({nullable: true, default: "https://img.freepik.com/premium-vector/blue-silhouette-person-s-face-against-white-background_754208-70.jpg?w=740"})
    photo_profile: string

    @Column({nullable: true, default: "https://images.unsplash.com/photo-1524893829393-a74a8c51c635?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"})
    background_image: string

    @Column({nullable: true})
    bio: string

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    created_at: Date

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    updated_at: Date

    @OneToMany(() => Thread, (thread) => {
        thread.user
    })
    threads: Thread

    @OneToMany(() => Like, (like) => {
        like.user
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
