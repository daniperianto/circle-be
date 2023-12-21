import * as  express  from 'express';
import ThreadController from '../controllers/ThreadController';
import auth from '../middleware/auth';
import ReplyController from '../controllers/ReplyController';

const replyRouter = express.Router()


replyRouter.get("/thread/:threadId/replies", ReplyController.findByThreadId)
replyRouter.get("/thread/:threadId/total-replies", ReplyController.getRepliesCount)
replyRouter.post("/thread/:threadId/reply/add",auth.Authentication, ReplyController.create)
replyRouter.put("/thread/:threadId/reply/:id",auth.Authentication, ReplyController.update)
replyRouter.delete("/reply/:id",auth.Authentication, ReplyController.delete)

export default replyRouter;
