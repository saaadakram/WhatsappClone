const express = require("express")
const { connect } = require("http2")
const {Server}= require("socket.io")
const app = express()
const helmet = require("helmet")
const server = require("http").createServer(app)
const cors = require("cors")
const authRouter = require("./router/authRouter")
const session = require("express-session")
require("dotenv").config()


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
app.use(session({
    secret: process.env.COOKIE_SECRET,
    credentials: true,
    name: "sid",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.environment === "production" ? "true" : "auto",
        httpOnly: true,
        sameSite: process.env.environment === "production" ? "none" : "lax"

    }

}))
app.use("/auth", authRouter)
app.get("/", (req,res)=>{
    res.json("I am running on port 4000")
})

io.on(connect, socket =>{})

server.listen(4000, ()=>{
    console.log("Server is listening on port 4000")
})