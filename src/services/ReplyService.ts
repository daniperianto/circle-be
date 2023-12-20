import { Repository } from "typeorm"
import { Reply } from "../entity/Reply"
import { AppDataSource } from "../data-source"
import { User } from "../entity/User"

export default new class ReplyService {
    private readonly repository: Repository<Reply> = AppDataSource.getRepository(Reply)

    async findAll(): Promise<Reply[]> {
        return await this.repository.find({
            order: {
                created_at: "DESC"
            }
        })
    }

    async findById(id: number): Promise<Reply> {
        const reply = await this.repository.findOne({
            where: {
                id: id
            }
        })

        return reply
    }

    async findByUserId(userid: number): Promise<Reply[]> {
        const replies = await this.repository.find({
            where: {
                user: {
                    id: userid
                }
            },
            order: {
                created_at: "DESC"
            }
        })

        return replies
    }

    async findByThreadId(threadid: number): Promise<Reply[]> {
        const replies = await this.repository.find({
            where: {
                thread: {
                    id: threadid
                }
            },
            order: {
                created_at: "DESC"
            }
        })

        return replies
    }

    async create( data: any): Promise<Reply> {
        const obj = this.repository.create({
            content: data.content,
            image: data.image,
            user: data.userId,
            thread: data.threadId
        })

        const reply = await this.repository.save(obj)

        return reply
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

        return result.affected == 1 ? true : false
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository
                        .createQueryBuilder()
                        .delete()
                        .from(Reply)
                        .where("id = :id", {id: id})
                        .execute()

        return result.affected == 1 ? true : false
    }
}