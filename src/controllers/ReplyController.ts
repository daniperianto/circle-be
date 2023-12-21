import { Request, Response } from 'express';
import { Reply } from './../entity/Reply';
import ReplyService from '../services/ReplyService';
import { createReplySchema } from '../utils/validator/ReplyValidator';

export default new class ReplyController {
    async findAll(req: Request, res: Response) {
        try {
            const replies = await ReplyService.findAll()

            return res.status(200).json(replies)
        } catch(error) {
            return res.status(500).json({message: "something error while fetching data"})
        }
    }

    async findByUser(req: Request, res: Response) {
        try {
            const userId = Number(req.params.userid)
            const replies = await ReplyService.findByUserId(userId)

            return res.status(200).json(replies)
        } catch(error) {
            return res.status(500).json({message: "something error while fetching data"})
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id)
            const reply = await ReplyService.findById(id)

            return res.status(200).json(reply)
        } catch(error) {
            return res.status(500).json({message: "something error while fetching data"})
        }
    }

    async findByUserId(req: Request, res: Response) {
        try {
            const id = res.locals.loginSession.id
            const reply = await ReplyService.findByUserId(id)

            return res.status(200).json(reply)
        } catch(error) {
            return res.status(500).json({message: "something error while fetching data"})
        }
    }

    async findByThreadId(req: Request, res: Response) {
        try {
            const id = Number(req.params.threadId)
            const reply = await ReplyService.findByThreadId(id)

            return res.status(200).json(reply)
        } catch(error) {
            return res.status(500).json({message: "something error while fetching data"})
        }
    }

    async getRepliesCount(req: Request, res: Response) {
        try {
            const id = Number(req.params.threadId)
            const count = await ReplyService.getRepliesCount(id)

            return res.status(200).json(count)
        } catch(error) {
            return res.status(500).json({message: "something error while counting replies"})
        }
    }

    async create(req: Request, res: Response) {
        try {
            const userId = res.locals.loginSession.registeredUser.id
            const threadid = Number(req.params.threadId)
            const data = req.body

            const { error } = createReplySchema.validate(data)
            if (error) return res.status(400).json(error.message)

            console.log(userId)
            data.userId = userId
            data.threadId = threadid
            const reply = await ReplyService.create(data)

            return res.status(201).json(reply)
        } catch(error) {
            console.log(error)
            return res.status(500).json({message: "something error while creating reply"})
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id)
            const data = req.body

            const { error } = createReplySchema.validate(data)
            if (error) return res.status(400).json(error.message)

            const isUpdated = await ReplyService.update(id, data)

            if(isUpdated) {
                const thread = await ReplyService.findById(id)
                return res.status(200).json({message:"success", data: thread})
            } else {
                return res.status(500).json({message: "something error while updating reply"})
            }
        } catch(error) {
            return res.status(500).json({message: "something error while updating reply"})
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id)

            const isDeleted = await ReplyService.delete(id)

            if(isDeleted) return res.status(200).json("deleted")
            else return res.status(500).json("failed")
        } catch(error) {
            return res.status(500).json({message: "something error while deleting reply"})
        }
    } 






}