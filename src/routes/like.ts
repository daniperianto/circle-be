import * as express from "express"
import LikeController from "../controllers/LikeController";
import auth from "../middleware/auth";

const likeRouter = express.Router()

likeRouter.get("/thread/:threadId/likes", LikeController.getLikesCount)
likeRouter.get("/thread/:threadId/like", auth.Authentication, LikeController.isLiked)
likeRouter.post("/thread/:threadId/like/", auth.Authentication, LikeController.create)
likeRouter.delete("/thread/:threadId/like/", auth.Authentication, LikeController.delete)

export default likeRouter