import * as amqp from "amqplib"

export default new class RabbitConfiq {
    async sendMessageToQueue(queueName: string, payload: any): Promise<any> {
        try {
            const connection = await amqp.connect("amqp://localhost")
            const channel =await connection.createChannel()

            await channel.assertQueue(queueName)

            channel.sendToQueue(queueName, Buffer.from(JSON.stringify(payload)))

            await channel.close()
            await connection.close()

            return "success"
        } catch(error) {
            console.log(error)
            return error
        }
    }
}