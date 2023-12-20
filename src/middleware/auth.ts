import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken"

export default new class Authentication {
    Authentication(req: Request, res: Response, next: NextFunction): Response {
        try {
            const auth = req.headers.authorization

            if(!auth || !auth.startsWith("Bearer ")) {
                return res.status(401).json({Error:"Unauthorized"})
            }

            const token = auth.split(" ")[1]

            try {
                const loginSession = jwt.verify(token, "secret")
                res.locals.loginSession = loginSession
                next()
            } catch (error) {
                console.log(error)
                return res.status(401).json({Error: "Token verification failed"})
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({Error: "Error while authenticating"})
        }
    }
}