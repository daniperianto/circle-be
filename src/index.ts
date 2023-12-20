import { AppDataSource } from "./data-source"
import * as dotenv from "dotenv"
import * as express from "express"
import userRouter from "./routes/user"
import threadRouter from "./routes/thread"
import replyRouter from "./routes/reply"
dotenv.config()

AppDataSource.initialize().then(async () => {
    const app = express()
    const port = 5000

    app.use(express.json())
    app.use("/api/v1", userRouter)
    app.use("/api/v1", threadRouter)
    app.use("/api/v1", replyRouter)

    app.listen(port, () => console.log("Server running on 5000"))

}).catch(error => console.log(error))
