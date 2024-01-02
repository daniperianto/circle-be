import "reflect-metadata"
import { DataSource } from "typeorm"
import {Follows} from "./entity/Follows";
import {Like} from "./entity/Like";
import {Reply} from "./entity/Reply";
import {Thread} from "./entity/Thread";
import {User} from "./entity/User";


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "backend",
    password: "root",
    database: "dumbways",
    synchronize: true,
    logging: false,
    entities: [Follows, Like, Reply, Thread, User],
    migrations: [],
    subscribers: [],
})


