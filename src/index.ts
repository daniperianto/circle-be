import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import * as dotenv from "dotenv"
import  express from "express"
import router from "./routes"
dotenv.config()

AppDataSource.initialize().then(async () => {
    const app = express()
    const port = 5000

    app.use(express.json())
    app.use("/api/v1", router)

    app.listen(port, () => console.log("Server running on 5000"))

}).catch(error => console.log(error))
