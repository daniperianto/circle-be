import * as express from "express"
import FollowingController from "../controllers/FollowingController"
import auth from "../middleware/auth"

const followingRouter = express.Router()

followingRouter.get("/following/:id/count", FollowingController.getTotalFollowing)
followingRouter.get("/followers/:id/count", FollowingController.getTotalFollowers)
followingRouter.post("/following/add", auth.Authentication, FollowingController.create)
followingRouter.delete("/following/delete", auth.Authentication, FollowingController.delete)
followingRouter.get("/following/suggested-accounts", auth.Authentication, FollowingController.getSugestedAccount)

export default followingRouter