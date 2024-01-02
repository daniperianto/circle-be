import { AppDataSource } from "../data-source"
import * as amqp from "amqplib"
import thread_worker from "./thread_worker"
import cloudinary from "../libs/cloudinary";
import * as dotenv from "dotenv"
dotenv.config()

export default new class WorkerHub {
    constructor() {
        AppDataSource.initialize()
            .then(async () => {
                const connection = await amqp.connect("amqp://localhost")
                cloudinary.upload()
                await thread_worker.create(process.env.queueName, connection)
            })
            .catch(()=> console.log("error"))
    }
}