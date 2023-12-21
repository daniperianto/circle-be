import { AppDataSource } from "./data-source"
import * as dotenv from "dotenv"
import * as express from "express"
import userRouter from "./routes/user"
import threadRouter from "./routes/thread"
import replyRouter from "./routes/reply"
import * as cors from "cors"
import likeRouter from "./routes/like"
dotenv.config()

AppDataSource.initialize().then(async () => {
    const app = express()
    const port = 5000

    const optionCors = {
        origin: "http://localhost:5173"
    }

    app.use(cors(optionCors))
    app.use(express.json())
    app.use("/api/v1", userRouter)
    app.use("/api/v1", threadRouter)
    app.use("/api/v1", replyRouter)
    app.use("/api/v1", likeRouter)
    

    app.listen(port, () => console.log("Server running on 5000"))

}).catch(error => console.log(error))
