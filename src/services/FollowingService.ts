import {Repository} from "typeorm"
import {AppDataSource} from "../data-source"
import {Follows} from "../entity/Follows"

export default new class FollowingService {
    private readonly repository: Repository<Follows> = AppDataSource.getRepository(Follows)

    async create(followingId: number, followersId: number): Promise<Follows> {
        const result = await this.repository
                                .createQueryBuilder()
                                .insert()
                                .into(Follows)
                                .values({
                                    followers_id: {
                                        id: followersId
                                    },
                                    following_id: {
                                        id: followingId
                                    }
                                })
                                .execute()

        return result.raw
    }

    async delete(followingId: number, followersId: number): Promise<boolean> {
        const result = await this.repository
                        .createQueryBuilder()
                        .delete()
                        .from(Follows)
                        .where("following_id = :followingId and followers_id = :followersId ", {
                            followingId: followingId, followersId: followersId
                        })
                        .execute()

        return result.affected == 1
    }

    async getTotalFollowing(userId: number): Promise<number> {
        return await this.repository
            .createQueryBuilder('following')
            .where("following.followers_id = :id", {id: userId})
            .getCount()
    }

    async getTotalFollowers(userId: number): Promise<number> {
        return await this.repository
            .createQueryBuilder('following')
            .where("following.following_id = :id", {id: userId})
            .getCount()
    }

    async getSuggestedAccount(userId: number): Promise<any[]> {
        return await this.repository
            .query(
                `select users.id, users.username, users.fullname, users.photo_profile from users left join 
                        ( select * from follows where followers_id = ${userId} ) as following
                        on users.id = following.followers_id or users.id = following.following_id
                        where following.following_id is null and users.id != ${userId} limit 5`
            )
    }

    async getFollowersAccount(userId: number): Promise<any[]> {
        return await this.repository
            .query(
                `select users.* from users inner join follows 
                                            on users.id = follows.followers_id
                                            where follows.following_id = ${userId}`
            )
    }

    async getFollowingAccount(userId: number): Promise<any[]> {
        return await this.repository
            .query(
                `select users.* from users inner join follows 
                                            on users.id = follows.following_id
                                            where follows.followers_id = ${userId}`
            )
    }

    async isFollowing(userId: number, followingId: number): Promise<boolean> {
        const follow = await this.repository
                                .createQueryBuilder('follows')
                                .where("follows.followers_id = :id and follows.following_id = :followingId", {id: userId, followingId: followingId}
                                        )
                                .getCount()

        return follow == 1
    }
}