import { Repository } from "typeorm"
import { User } from "../entity/User"
import { AppDataSource } from "../data-source"

export default new class UserService {
    private readonly repository: Repository<User> = AppDataSource.getRepository(User)

    async findById(id: number): Promise<User> {
        const user = await this.repository.findOne({
            where: {
                id: id
            }
        })

        return user
    }
    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({
            where: {
                email: email
            }})
        console.log(user)

        return user;
    }

    async findByUsername(username: string): Promise<User> {
        const user = await this.repository.findOne({
            where: {
                username: username
            }})

        return user;
    }


    async create(data: any): Promise<User> {
        const obj = this.repository.create({
            username: data.username,
            fullname: data.fullname,
            email: data.email,
            password: data.password
        })

        const user = await this.repository.save(obj)

        return user;
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


        return result.affected == 1 ? true : false
    }

    async delete(id: number): Promise<boolean> {
        const user = await this.repository
                        .createQueryBuilder()
                        .delete()
                        .from(User)
                        .where("id = :id", {id: id})
                        .execute()

        return user.affected == 1 ? true : false
    }
}