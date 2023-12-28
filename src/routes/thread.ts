import * as  express  from 'express';
import ThreadController from '../controllers/ThreadController';
import auth from '../middleware/auth';
import FileUpload from '../middleware/uploadfile';

const threadRouter = express.Router()
const uploadMiddleware = new FileUpload('image')

threadRouter.get("/threads/all", ThreadController.findAll)
threadRouter.get("/thread/:id", ThreadController.findById)
threadRouter.get("/threads/user/:id", auth.Authentication, ThreadController.findByUser)
threadRouter.get("/threads/following", auth.Authentication, ThreadController.findByFollowing)
threadRouter.post("/thread/add",auth.Authentication, uploadMiddleware.handleUpload.bind(uploadMiddleware), ThreadController.create)
threadRouter.put("/thread/:id",auth.Authentication, uploadMiddleware.handleUpload.bind(uploadMiddleware), ThreadController.update)
threadRouter.delete("/thread/:id",auth.Authentication, ThreadController.delete)

export default threadRouter;
