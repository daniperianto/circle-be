import * as express from "express"
import FollowingController from "../controllers/FollowingController"
import auth from "../middleware/auth"

const followingRouter = express.Router()

followingRouter.get("/following/:id/count", FollowingController.getTotalFollowing)
followingRouter.get("/followers/:id/count", FollowingController.getTotalFollowers)
followingRouter.get("/following/get-following", auth.Authentication, FollowingController.getFollowingAccount)
followingRouter.get("/followers/get-followers", auth.Authentication, FollowingController.getFollowersAccount)
followingRouter.get("/following/is-following/:followingId", auth.Authentication, FollowingController.isFollowing)
followingRouter.post("/following/add/:id", auth.Authentication, FollowingController.create)
followingRouter.delete("/following/delete/:id", auth.Authentication, FollowingController.delete)
followingRouter.get("/following/suggested-accounts", auth.Authentication, FollowingController.getSugestedAccount)

export default followingRouter