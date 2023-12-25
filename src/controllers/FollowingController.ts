import { Request, Response } from "express";
import FollowingService from "../services/FollowingService";

export default new class FollowingController {
    async create(req: Request, res: Response) {
        try {
            const following_id  = req.body.following_id
            const id = res.locals.loginSession.registeredUser.id
            const following = await FollowingService.create(Number(following_id), Number(id))

            return res.status(200).json(following)
        } catch(error) {
            console.log(error)
            return res.status(500).json({message: "internal server error"})
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const following_id = req.body.following_id
            const id = res.locals.loginSession.registeredUser.id
            const idDeleted = await FollowingService.delete(Number(following_id), Number(id))

            if(idDeleted) res.status(200).json({message: "success"})
            else res.status(400).json({message: "failed"})
        } catch(error) {
            console.log(error)
            return res.status(500).json({message: "internal server error"})
        }
    }

    async getTotalFollowing(req: Request, res: Response) {
        try {
            const id = Number(req.params.id)
            const totalFollowing = await FollowingService.getTotalFollowing(id)

            return res.status(200).json(totalFollowing)
        } catch(error) {
            console.log(error)
            return res.status(500).json({message: "internal server error"})
        }
    }

    async getTotalFollowers(req: Request, res: Response) {
        try {
            const id = Number(req.params.id)
            const totalFollowers = await FollowingService.getTotalFollowers(id)

            return res.status(200).json(totalFollowers)
        } catch(error) {
            console.log(error)
            return res.status(500).json({message: "internal server error"})
        }
    }

    async getSugestedAccount(req: Request, res: Response) {
        try {
            const id = res.locals.loginSession.registeredUser.id
            const users = await FollowingService.getSugestedAccount(id)

            return res.status(200).json(users)
        } catch(error) {
            console.log(error)
            return res.status(500).json({message: "internal server error"})
        }
    }
}