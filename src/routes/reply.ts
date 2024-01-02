import * as  express  from 'express';
import auth from '../middleware/auth';
import ReplyController from '../controllers/ReplyController';
import FileUpload from '../middleware/uploadfile';

const replyRouter = express.Router()
const uploadMiddleware = new FileUpload('image')



replyRouter.get("/thread/:threadId/replies", ReplyController.findByThreadId)
replyRouter.get("/thread/:threadId/total-replies", ReplyController.getRepliesCount)
replyRouter.post("/thread/:threadId/reply/add",auth.Authentication, uploadMiddleware.handleUpload.bind(uploadMiddleware), ReplyController.create)
replyRouter.put("/thread/:threadId/reply/:id",auth.Authentication, ReplyController.update)
replyRouter.delete("/reply/:id",auth.Authentication, ReplyController.delete)

export default replyRouter;
