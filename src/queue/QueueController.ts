import { Request, Response } from "express";
import rabbitmq from "../libs/rabbitmq";

export default new class QueueController {
    async create(req: Request, res: Response) {
        const loginSession = ""

        // get data and validation

        const errorQueue = await rabbitmq.sendMessageToQueue("queueName", "data")

        return res.status(201).json({message: "Success creating a new thread !", data: ""})
    }
}