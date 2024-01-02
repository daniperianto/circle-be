import {DataSource, Repository} from "typeorm"
import {User} from "../entity/User"

export class UserService {
    private readonly repository: Repository<User>;

    public constructor(dataSource: DataSource) {
        if(!dataSource) throw new Error("data source is null")
        this.repository = dataSource.getRepository(User)
    }

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
        const user = await this.repository.findOne({
            where: {
                id: id
            }
        })


        if(data.fullname) {
            user.fullname = data.fullname
        }
        if(data.username) {
            user.username = data.username
        }
        if(data.email) {
            user.email = data.email
        }
        if(data.bio) {
            user.bio = data.bio
        }
        if(data.photo_profile) {
            user.photo_profile = data.photo_profile
        }
        if(data.background_image) {
            user.background_image = data.background_image
        }


        const result = await this.repository
                        .createQueryBuilder()
                        .update(User)
                        .set({
                            username: user.username,
                            fullname: user.fullname,
                            email: user.email,
                            photo_profile: user.photo_profile,
                            bio: user.bio,
                            background_image: user.background_image,
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