import { Request, Response } from "express";
import ThreadService from "../services/ThreadService";
import { createThreadSchema } from "../utils/validator/ThreadValidator";
import cloudinary from "../libs/cloudinary";

export default new class ThreadController {
    async findAll(req: Request, res: Response) {
        try {
            const threads = await ThreadService.findAll()

            

            return res.status(200).json(threads)
        } catch(error) {
            console.log(error)
            return res.status(500).json({message: "something error while fetching data"})
        }
    }

    async findByFollowing(req: Request, res: Response) {
        try {
            const userId = Number(res.locals.loginSession.registeredUser.id)
            console.log(userId)
            const threads = await ThreadService.findByFollowing(userId)
            console.log(threads)

            return res.status(200).json(threads)
        } catch(error) {
            console.log(error)
            return res.status(500).json({message: "something error while fetching data"})
        }
    }

    async findByUser(req: Request, res: Response) {
        try {
            const userId = Number(res.locals.loginSession.registeredUser.id)
            const threads = await ThreadService.findByUserId(userId)

            return res.status(200).json(threads)
        } catch(error) {
            console.log(error)
            return res.status(500).json({message: "something error while fetching data"})
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id)
            const thread = await ThreadService.findById(id)

            return res.status(200).json(thread)
        } catch(error) {
            console.log(error)
            return res.status(500).json({message: "something error while fetching data"})
        }
    }

    async create(req: Request, res: Response) {
        try {
            const userId = res.locals.loginSession.registeredUser.id
            let urlImage: string = null
            if(req.file) urlImage = await cloudinary.destination(req.file.filename)

            const data = {
                content: req.body.content,
                image: urlImage,
                user_id: Number(userId)
            }
            

            const { error } = createThreadSchema.validate(data)
            if (error) return res.status(400).json(error.message)

            const thread = await ThreadService.create(data)

            return res.status(201).json(thread)
        } catch(error) {
            console.log(error)
            return res.status(500).json({message: "something error while creating thread"})
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id)
            const data = req.body

            const { error } = createThreadSchema.validate(data)
            if (error) return res.status(400).json(error.message)

            const isUpdated = await ThreadService.update(id, data)

            if(isUpdated) {
                const thread = await ThreadService.findById(id)
                return res.status(200).json({message:"success", data: thread})
            } else {
                return res.status(500).json({message: "something error while updating thread"})
            }
        } catch(error) {
            return res.status(500).json({message: "something error while updating thread"})
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id)

            const isDeleted = await ThreadService.delete(id)

            if(isDeleted) return res.status(200).json("deleted")
            else return res.status(500).json("failed")
        } catch(error) {
            return res.status(500).json({message: "something error while deleting thread"})
        }
    } 
}