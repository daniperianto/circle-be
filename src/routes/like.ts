import express = require("express");
import LikeControllers from "../controllers/LikeControllers";
import auth from "../middleware/auth";

const likeRouter = express.Router()

likeRouter.get("/thread/:threadId/likes", LikeControllers.getLikesCount)
likeRouter.post("/thread/:threadId/like/", auth.Authentication, LikeControllers.create)
likeRouter.delete("/thread/:threadId/like/", auth.Authentication, LikeControllers.delete)

export default likeRouter