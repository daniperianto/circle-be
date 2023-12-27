import { EventEmitter } from "stream"
import * as amqp from "amqplib"
import cloudinary from "../libs/cloudinary"
import ThreadService from "../services/ThreadService"

export default new class ThreadWorker extends EventEmitter {
    async create(queueName: string, connect: amqp.Connection) {
        try {
            const channel = await connect.createChannel()

            await channel.assertQueue(queueName)
            await channel.consume(queueName, async (message) => {
                if(message != null) {
                    try {
                        const payload = JSON.parse(message.content.toString())

                        const urlImage = cloudinary.destination(payload.image)
                        payload.image = urlImage

                        ThreadService.create(payload)
                    } catch(error) {
                        console.log(error)
                    }
                }
            })
        } catch(error) {
            console.log(error)

        }
    } 
}