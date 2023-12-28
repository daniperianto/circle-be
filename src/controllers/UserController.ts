import { Request, Response } from "express";
import { createUserSchema } from "../utils/validator/UserValidator";
import UserService from "../services/UserService";
import * as bcrypt from "bcrypt"
import { User } from "../entity/User";
import { createLoginUserSchema } from "../utils/validator/LoginValidator";
import * as jwt from "jsonwebtoken"

export default new class UserController{
    async register(req: Request, res: Response) {
        try {
            const data = req.body
            data.username = '@' + data.fullname

            const { error } = createUserSchema.validate(data)
            if (error) return res.status(400).json(error.message)

            const checkEmail = await UserService.findByEmail(data.email)
            if (checkEmail) return res.status(400).json({message: "email already exist!"})

            const checkUsername = await UserService.findByUsername(data.username)
            if (checkUsername) return res.status(400).json({message: "username already exist!"})


            data.password = await bcrypt.hash(data.password, 10)

            const newUser = await UserService.create(data)
            
            return res.status(201).json(newUser)
        } catch (error) {
            return res.status(500).json({message: "something wrong while register"})
        }
    }

    async login(req: Request, res: Response) {
        try {
            const data = req.body
            let user: User

            const { error } = createLoginUserSchema.validate(data)
            if (error) return res.status(400).json(error.message)

            if (data.email) {
                user = await UserService.findByEmail(data.email)
                if (!user) return res.status(400).json({message: "email doesn't exists"})
            } else if (data.username) {
                user = await UserService.findByUsername(data.username)
                if (!user) return res.status(400).json({message: "username doesn't exists"})
            }

            const isPasswordMatch = await bcrypt.compare(data.password, user.password)
            if (!isPasswordMatch) return res.status(409).json({ message: "Incorrect password!"})

            const registeredUser = {
                id: user.id,
                username: user.username,
                fullname: user.fullname,
                photo_profile: user.photo_profile,
                background_image: user.background_image,
                created_at: user.created_at
            }

            const token = jwt.sign({registeredUser}, process.env.SECRET_KEY, {expiresIn: 3600})

            return res.status(200).json({registeredUser, token})
        } catch(error) {
            console.log(error)
            return res.status(500).json({message: "something error while login"})
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id: number = Number(req.params.id)
            const data = req.body

            const { error } = createUserSchema.validate(data)
            if (error) return res.status(400).json(error.message)

            data.password = await bcrypt.hash(data.password, 10)

            const isUpdated = await UserService.update(id, data)
            if (isUpdated) {
                const user = await UserService.findById(id)
                return res.status(200).json({message: "updated success", data: user})
            } else return res.status(500).json("updated failed")
        } catch(error) {
            return res.status(500).json({message: "internal server error"})
        }
    }

    async check(req: Request, res: Response) {
        try {
            const userId = res.locals.loginSession.registeredUser.id
            const user = await UserService.findById(userId)

            if(user) return res.status(200).json({message: "token is valid"})
            else return res.status(400).json({message: "token is not valid"})

        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "internal server error"})
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id: number = Number(req.params.id)
            const idDeleted = await UserService.delete(id)
            if (idDeleted) return res.status(200).json("success")
            else return res.status(500).json("failed")
        } catch(error) {
            return res.status(500).json({message: "internal server error"})
        }
    }

    async searchByFullname(req: Request, res: Response) {
        try {
            const id: number = res.locals.loginSession.registeredUser.id
            const search = req.params.search

            const users = await UserService.searchByFullname(search, id)

            return res.status(200).json(users)
        } catch(error) {
            console.log(error)
            return res.status(500).json({message: "internal server error"})
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const id:number = Number(req.params.id)

            const user = await UserService.findById(id)

            return res.status(200).json(user)
        } catch(error) {
            console.log(error)
            return res.status(500).json({message: "internal server error"})
        }
    }
}