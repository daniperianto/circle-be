import { Repository } from 'typeorm';
import { Thread } from './../entity/Thread';
import { AppDataSource } from '../data-source';

export default new class ThreadService {
    private readonly repository: Repository<Thread> = AppDataSource.getRepository(Thread)
    
    async findAll(): Promise<Thread[]> {
        return await this.repository.find()
    }

    async findById(id: number): Promise<Thread> {
        const thread = await this.repository.findOne({
            where: {
                id: id
            }
        })

        return thread
    }

    async findByUserId(id: number): Promise<Thread[]> {
        const threads = await this.repository.find({
            where: {
                created_by: {
                    id: id
                }
            }
        })

        return threads
    }

    async create(data: any): Promise<Thread> {
        const obj = this.repository.create({
            content: data.content,
            image: data.image,
            created_by: data.user_id,
            updated_by: data.user_id
        })

        const thread = await this.repository.save(obj)

        return thread
    }

    async update(id:string, data: any): Promise<boolean> {
        const result = await this.repository
                        .createQueryBuilder()
                        .update(Thread)
                        .set({
                            content: data.content,
                            image: data.image,
                            updated_at: new Date()
                        })
                        .where("id = :id", {id: id})
                        .execute()

        return result.affected == 1 ? true : false
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.repository
                        .createQueryBuilder()
                        .delete()
                        .from(Thread)
                        .where("id = :id", {id: id})
                        .execute()

        return result.affected == 1 ? true : false
    }
}