import {EventEmitter} from "stream"
import * as amqp from "amqplib"
import cloudinary from "../libs/cloudinary"
import ThreadService from "../services/ThreadService"

export default new class ThreadWorker extends EventEmitter {
    async create(queueName: string, connect: amqp.Connection) {
        try {
            const channel = await connect.createChannel()

            const data = await channel.assertQueue("threadQueue", {durable: true})
            console.log(data)
            await channel.consume(queueName, async (message) => {
                if(message != null) {
                    try {
                        cloudinary.upload()
                        const payload = JSON.parse(message.content.toString())

                        payload.image = await cloudinary.destination(payload.image)

                        console.log("payload: " + payload)
                        const response = await ThreadService.create(payload)
                        console.log(response)
                    } catch(error) {
                        console.log(error)
                    }
                }
            }, {
                noAck: false
            })
        } catch(error) {
            console.log(error)
        }
    } 
}