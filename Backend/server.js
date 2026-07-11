import dotenv from "dotenv"
dotenv.config()
import app from "./src/app.js"
import http from "http"
import {connectToDB} from "./src/config/database.js"
import { initSocket } from "./src/sockets/server.socket.js";

connectToDB()

const PORT = process.env.PORT || 3000;

const httpServer = http.createServer(app)
initSocket(httpServer)

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

