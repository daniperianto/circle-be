import * as  express  from 'express';
import ThreadController from '../controllers/ThreadController';
import auth from '../middleware/auth';
import ReplyController from '../controllers/ReplyController';

const replyRouter = express.Router()


replyRouter.get("/reply/:threadid", ReplyController.findByThreadId)
replyRouter.post("/reply/:threadid/add",auth.Authentication, ReplyController.create)
replyRouter.put("/reply/:threadid/:id",auth.Authentication, ReplyController.update)
replyRouter.delete("/reply/:id",auth.Authentication, ReplyController.delete)

export default replyRouter;
