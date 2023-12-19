import express from "express"
import UserController from "../controllers/UserController";

const router = express.Router() 

router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.patch("/user/:id", UserController.update)
router.delete("/user/:id", UserController.delete)

export default router;