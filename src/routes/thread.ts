import * as  express  from 'express';
import ThreadController from '../controllers/ThreadController';
import auth from '../middleware/auth';

const threadRouter = express.Router()

threadRouter.get("/threads/all", ThreadController.findAll)
threadRouter.get("/thread/:id", ThreadController.findById)
threadRouter.get("/threads/:userid", ThreadController.findByUser)
threadRouter.post("/thread/add",auth.Authentication, ThreadController.create)
threadRouter.put("/thread/:id",auth.Authentication, ThreadController.update)
threadRouter.delete("/thread/:id",auth.Authentication, ThreadController.delete)

export default threadRouter;
