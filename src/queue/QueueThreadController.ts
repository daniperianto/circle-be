import { Request, Response } from "express";
import rabbitmq from "../libs/rabbitmq";
import cloudinary from "../libs/cloudinary";
import {createThreadSchema} from "../utils/validator/ThreadValidator";

export default new class QueueThreadController {
    async create(req: Request, res: Response) {
        const userId: number = res.locals.loginSession.registeredUser.id
        let image: string = null
        if(req.file) image = req.file.filename

        const data = {
            content: req.body.content,
            image: image,
            user_id: userId
        }

        const { error } = createThreadSchema.validate(data)
        if (error) return res.status(400).json(error.message)

        const errorQueue = await rabbitmq.sendMessageToQueue(process.env.queueName, data)

        return res.status(201).json({message: "Success creating a new thread !", data: data})
    }
}