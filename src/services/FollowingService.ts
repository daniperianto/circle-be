import { Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import { Following } from "../entity/Following"
import { User } from "../entity/User"

export default new class FollowingService {
    private readonly repository: Repository<Following> = AppDataSource.getRepository(Following)

    async create(followingId: number, followersId: number): Promise<Following> {
        const result = await this.repository
                                .createQueryBuilder()
                                .insert()
                                .into(Following)
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
                        .from(Following)
                        .where("following_id = :followingId and followers_id = :followersId ", {
                            followingId: followingId, followersId: followersId
                        })
                        .execute()

        return result.affected == 1 ? true : false
    }

    async getTotalFollowing(userId: number): Promise<number> {
        const total_following = await this.repository
                                        .createQueryBuilder('following')
                                        .where("following.followers_id = :id", {id: userId})
                                        .getCount()

        return total_following
    }

    async getTotalFollowers(userId: number): Promise<number> {
        const total_followers = await this.repository
                                        .createQueryBuilder('following')
                                        .where("following.following_id = :id", {id: userId})
                                        .getCount()

        return total_followers
    }

    async getSugestedAccount(userId: number): Promise<any[]> {
        const sugestedAccounts = await this.repository
                                        .query(
                                            `select users.id, users.username, users.fullname, users.photo_profile from users left join ( select * from followings where followers_id = ${userId} ) as following
                                            on users.id = following.followers_id or users.id = following.following_id
                                            where following.following_id is null and users.id != ${userId} limit 5`
                                        )
        return sugestedAccounts
    }

    async getFollowersAccount(userId: number): Promise<any[]> {
        const followersAccount = await this.repository
                                        .query(
                                            `select users.* from users inner join followings 
                                            on users.id = followings.followers_id
                                            where followings.following_id = ${userId}`
                                        )
        
        return followersAccount
    }

    async getFollowingAccount(userId: number): Promise<any[]> {
        const followingAccount = await this.repository
                                        .query(
                                            `select users.* from users inner join followings 
                                            on users.id = followings.following_id
                                            where followings.followers_id = ${userId}`
                                        )

        return followingAccount
    }

    async isFollowing(userId: number, followingId: number): Promise<boolean> {
        const follow = await this.repository
                                .createQueryBuilder('following')
                                .where("following.followers_id = :id and following.following_id = :followingId", {id: userId, followingId: followingId}
                                        )
                                .getCount()

        return follow == 1
    }
}