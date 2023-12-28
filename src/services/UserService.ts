import {Repository} from "typeorm"
import {User} from "../entity/User"
import {AppDataSource} from "../data-source"

export default new class UserService {
    private readonly repository: Repository<User> = AppDataSource.getRepository(User)

    async findById(id: number): Promise<User> {
        return await this.repository.findOne({
            where: {
                id: id
            }
        })
    }
    async findByEmail(email: string): Promise<User> {
        return await this.repository.findOne({
            where: {
                email: email
            }
        });
    }

    async findByUsername(username: string): Promise<User> {
        return await this.repository.findOne({
            where: {
                username: username
            }
        });
    }

    async searchByFullname(search: string, id: number): Promise<User[]> {
        return await this.repository
            .createQueryBuilder('user')
            .where("user.fullname ilike :name and user.id != :id", {name: `%${search}%`, id: id})
            .orWhere("user.username like :name and user.id != :id", {name: `%${search}%`, id: id})
            .getMany()
    }


    async create(data: any): Promise<User> {
        const obj = this.repository.create({
            username: data.username,
            fullname: data.fullname,
            email: data.email,
            password: data.password
        })

        return await this.repository.save(obj);
    }

    async update(id: number, data: any): Promise<boolean> {
        const result = await this.repository
                        .createQueryBuilder()
                        .update(User)
                        .set({
                            username: data.username,
                            fullname: data.fullname,
                            email: data.email,
                            password: data.password,
                            photo_profile: data.photo_profile,
                            bio: data.bio,
                            updated_at: new Date()
                        })
                        .where("id = :id", {id: id})
                        .execute()


        return result.affected == 1
    }

    async delete(id: number): Promise<boolean> {
        const user = await this.repository
                        .createQueryBuilder()
                        .delete()
                        .from(User)
                        .where("id = :id", {id: id})
                        .execute()

        return user.affected == 1
    }
}