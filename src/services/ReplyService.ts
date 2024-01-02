import {Repository} from "typeorm"
import {Reply} from "../entity/Reply"
import {AppDataSource} from "../data-source"

export default new class ReplyService {
    private readonly repository: Repository<Reply> = AppDataSource.getRepository(Reply)

    // async findAll(): Promise<Reply[]> {
    //     return await this.repository.find({
    //         order: {
    //             created_at: "DESC"
    //         }
    //     })
    // }

    async findById(id: number): Promise<Reply> {
        return await this.repository.findOne({
            where: {
                id: id
            }
        })
    }

    // async findByUserId(userid: number): Promise<Reply[]> {
    //     return await this.repository.find({
    //         where: {
    //             user: {
    //                 id: userid
    //             }
    //         },
    //         order: {
    //             created_at: "DESC"
    //         }
    //     })
    // }

    async findByThreadId(threadId: number): Promise<Reply[]> {
        return await this.repository
            .createQueryBuilder('reply')
            .innerJoinAndSelect('reply.user', 'user')
            .where('reply.thread = :id', {id: threadId})
            .orderBy('reply.created_at', 'ASC')
            .getMany()
    }

    async getRepliesCount(threadId: number): Promise<number> {
        return await this.repository
            .createQueryBuilder()
            .select()
            .where({
                thread: {
                    id: threadId
                }
            })
            .getCount()
    }

    async create( data: any): Promise<Reply> {
        const obj = this.repository.create({
            content: data.content,
            image: data.image,
            user: data.userId,
            thread: data.threadId
        })

        return await this.repository.save(obj)
    }

    async update(id: number, data: any): Promise<boolean> {
        const result = await this.repository
                        .createQueryBuilder()
                        .update(Reply)
                        .set({
                            content: data.content,
                            image: data.image,
                            updated_at: new Date()
                        })
                        .where("id = :id", {id: id})
                        .execute()

        return result.affected == 1
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository
                        .createQueryBuilder()
                        .delete()
                        .from(Reply)
                        .where("id = :id", {id: id})
                        .execute()

        return result.affected == 1
    }
}