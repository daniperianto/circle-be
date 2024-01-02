import "reflect-metadata"
import {DataSource} from "typeorm";
import {Follows} from "../src/entity/Follows";
import {Like} from "../src/entity/Like";
import {Reply} from "../src/entity/Reply";
import {Thread} from "../src/entity/Thread";
import {User} from "../src/entity/User";

export const AppDataSourceTest = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "backend",
    password: "root",
    database: "dumbways.test",
    synchronize: true,
    logging: false,
    entities: [Follows, Like, Reply, Thread, User],
    migrations: ["src/migration/*.ts"],
    subscribers: [],
})

AppDataSourceTest.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })