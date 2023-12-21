import { Repository } from 'typeorm';
import { Thread } from './../entity/Thread';
import { AppDataSource } from '../data-source';
import LikeService from './LikeService';
import { number } from 'joi';

export default new class ThreadService {
    private readonly repository: Repository<Thread> = AppDataSource.getRepository(Thread)
    
    async findAll(): Promise<any[]> {
        const threads = await this.repository
                                 .createQueryBuilder('thread')
                                 .leftJoinAndSelect('thread.user', 'user')
                                 .orderBy('thread.created_at', 'DESC' )
                                 .getMany()

        
        
        return threads
    }

    async findById(id: number): Promise<Thread> {
        const thread = await this.repository
                                .createQueryBuilder('thread')
                                .leftJoinAndSelect('thread.user', 'user')
                                .where("thread.id = :id ", {id: id})
                                .orderBy('thread.created_at', 'DESC' )
                                .getOne()

        

        return thread
    }

    async findByUserId(id: number): Promise<Thread[]> {
        const threads = await this.repository.find({
            where: {
                user: {
                    id: id
                }
            },
            order: {
                created_at: "DESC"
            }
        })

        return threads
    }

    async create(data: any): Promise<Thread> {
        const obj = this.repository.create({
            content: data.content,
            image: data.image,
            user: {
                id: data.user_id
            }
        })

        const thread = await this.repository.save(obj)

        return thread
    }

    async update(id: number, data: any): Promise<boolean> {
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

    async delete(id: number): Promise<boolean> {
        const result = await this.repository
                        .createQueryBuilder()
                        .delete()
                        .from(Thread)
                        .where("id = :id", {id: id})
                        .execute()

        return result.affected == 1 ? true : false
    }


}