import dotenv from "dotenv"
dotenv.config()
import app from "./src/app.js"
import http from "http"
import {connectToDB} from "./src/config/database.js"
import { initSocket } from "./src/sockets/server.socket.js";

connectToDB()

const httpsServer = http.createServer(app)
initSocket(httpsServer)

httpsServer.listen(3000, () => {
    console.log("Server is running on port 3000")
})

