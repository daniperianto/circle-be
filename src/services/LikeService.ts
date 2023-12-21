import { Repository } from "typeorm"
import { Like } from "../entity/Like"
import { AppDataSource } from "../data-source"

export default new class LikeService {
    private readonly repository: Repository<Like> = AppDataSource.getRepository(Like)


    async getCountByThread(threadId: number): Promise<Number> {
        const count = await this.repository
                        .createQueryBuilder()
                        .select('like')
                        .from(Like, 'like')
                        .where('like.threadId = :id', {id: threadId})
                        .getCount()

        return count    
    }

    async create(threadId: number, userId: number): Promise<Like> {
        const result = await this.repository
                        .createQueryBuilder()
                        .insert()
                        .into(Like)
                        .values({
                            thread: {
                                id: threadId
                            },
                            user: {
                                id: userId
                            }
                        })
                        .execute()
                        
        return result.raw
    }

    async delete(threadId: number, userId: number): Promise<boolean> {
        const result = await this.repository
                                .createQueryBuilder()
                                .delete()
                                .from(Like)
                                .where({
                                    thread: {
                                        id: threadId
                                    },
                                    user: {
                                        id: userId 
                                    }
                                })
                                .execute()

        return result.affected == 1 ? true : false
    }

    
}