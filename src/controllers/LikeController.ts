import { Request, Response } from "express";
import LikeService from "../services/LikeService";

export default new class LikeController {

    async getLikesCount(req: Request, res: Response) {
        try {
            const threadId = Number(req.params.threadId)

            const count = await LikeService.getCountByThread(threadId)

            res.status(200).json(count)
        } catch(error) {
            console.log(error)
            res.status(500).json({error :"something error while getting count"})
        }
    }

    async isLiked(req: Request, res: Response) {
        try {
            const threadId = Number(req.params.threadId)
            const userId = Number(res.locals.loginSession.registeredUser.id)

            const isLiked = await LikeService.isLiked(threadId, userId)

            res.status(200).json(isLiked)
        } catch(error) {
            console.log(error)
            res.status(500).json({error: "something error while getting result"})
        }
    }

    async create(req: Request, res: Response) {
        try {
            const threadId =  Number(req.params.threadId)
            const userId = res.locals.loginSession.registeredUser.id

            const like = await LikeService.create(threadId, userId)

            res.status(200).json(like)
        } catch (error) {
            console.log(error)
            res.status(500).json({error :"something error while adding like"})
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const threadId =  Number(req.params.threadId)
            const userId = res.locals.loginSession.registeredUser.id

            const isDeleted = await LikeService.delete(threadId, userId)

            if(isDeleted) res.status(200).json("success")
            else res.status(400).json("failed")
        } catch (error) {
            console.log(error)
            res.status(500).json({error: "something error while deleting like"})
        }
    }
}