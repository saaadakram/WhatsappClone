const express = require("express")
const { connect } = require("http2")
const {Server}= require("socket.io")
const app = express()
const helmet = require("helmet")
const server = require("http").createServer(app)
const cors = require("cors")
const authRouter = require("./router/authRouter")


const io = new Server(server, {
    cors:{
        origin:"http://localhost:3000/",
        credentials: true
    }
})

app.use(helmet())
app.use(cors({
    origin:"http://localhost:3000/",
        credentials: true
}))
app.use(express.json())
app.use("/auth", authRouter)
app.get("/", (req,res)=>{
    res.json("I am running on port 4000")
})

io.on(connect, socket =>{})

server.listen(4000, ()=>{
    console.log("Server is listening on port 4000")
})