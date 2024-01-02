import {Repository} from 'typeorm';
import {Thread} from '../entity/Thread';
import {AppDataSource} from '../data-source';

export default new class ThreadService {
    private readonly repository: Repository<Thread> = AppDataSource.getRepository(Thread)
    
    async findAll(): Promise<any[]> {
        return await this.repository
            .createQueryBuilder('thread')
            .leftJoinAndSelect('thread.user', 'user')
            .orderBy('thread.created_at', 'DESC')
            .getMany()
    }

    async findById(id: number): Promise<Thread> {
        return await this.repository
            .createQueryBuilder('thread')
            .leftJoinAndSelect('thread.user', 'user')
            .where("thread.id = :id ", {id: id})
            .orderBy('thread.created_at', 'DESC')
            .getOne()
    }

    async findByUserId(id: number): Promise<Thread[]> {
        return await this.repository.find({
            where: {
                user: {
                    id: id
                }
            },
            order: {
                created_at: "DESC"
            }
        })
    }

    async findByFollowing(id: number): Promise<Thread[]> {
        return await this.repository
            .query(`select threads.id,
                                threads.content,
                                threads.image,
                                threads.created_at,
                                json_build_object('username', users.username, 
                                                  'fullname', users.fullname,
                                                  'photo_profile', users.photo_profile) as user
                                from threads inner join users on threads.user_id = users.id
                                where user_id in ( select following_id from follows where followers_id = ${id})
                                order by threads.created_at DESC`)
    }

    async create(data: any): Promise<Thread> {
        const obj = this.repository.create({
            content: data.content,
            image: data.image,
            user: {
                id: data.user_id
            }
        })

        return await this.repository.save(obj)
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

        return result.affected == 1
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository
                        .createQueryBuilder()
                        .delete()
                        .from(Thread)
                        .where("id = :id", {id: id})
                        .execute()

        return result.affected == 1
    }


}