import { AppDataSource } from "../data-source"
import * as amqp from "amqplib"
import thread_worker from "./thread_worker"

export default new class WorkerHub {
    constructor() {
        AppDataSource.initialize()
            .then(async () => {
                const connection = await amqp.connect("amqp://localhost")
                await thread_worker.create("thread_queue", connection)
            })
            .catch(()=> console.log("error"))
    }
}