import * as express from "express"
import UserController from "../controllers/UserController";
import auth from "../middleware/auth";

const userRouter = express.Router() 

userRouter.post("/register", UserController.register)
userRouter.post("/login", UserController.login)
userRouter.put("/user/:id", auth.Authentication, UserController.update)
userRouter.delete("/user/:id", auth.Authentication, UserController.delete)

export default userRouter;