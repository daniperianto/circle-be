import { Request, Response } from "express";
import FollowingService from "../services/FollowingService";

export default new class FollowingController {
    async create(req: Request, res: Response) {
        try {
            const following_id  = req.params.id
            const id = res.locals.loginSession.registeredUser.id
            const following = await FollowingService.create(Number(following_id), Number(id))

            if(following) return res.status(200).json({message: "success"})
            else return res.status(400).json({message: "error"})
        } catch(error) {
            console.log(error)
            return res.status(500).json({message: "internal server error"})
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const following_id = req.params.id
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

    async getFollowersAccount(req: Request, res: Response) {
        try {
            const id = res.locals.loginSession.registeredUser.id
            const users = await FollowingService.getFollowersAccount(id)

            return res.status(200).json(users)
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "internal server error"})
        }
    }

    async getFollowingAccount(req: Request, res: Response) {
        try {
            const id = res.locals.loginSession.registeredUser.id
            const users = await FollowingService.getFollowingAccount(id)

            return res.status(200).json(users)
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "internal server error"})
        }
    }

    async isFollowing(req: Request, res: Response) {
        try {
            const id = res.locals.loginSession.registeredUser.id
            const followingId = Number(req.params.followingId)

            const isFollowing = await FollowingService.isFollowing(id, followingId)
            return res.status(200).json(isFollowing)
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "internal server error"})
        }
    }
}