
import express from "express"
import dotenv from "dotenv"
import {connectdb} from "./src/config/db.js"
import useroutes from "./src/routes/user.routes.js"
import interviewRouter from "./src/routes/interview.routes.js"

import cookieParser from "cookie-parser"
import cors from "cors"

dotenv.config()

const app=express()
const port=process.env.PORT


app.use(express.json()) 
app.use(cookieParser())

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))

app.use("/api/auth",useroutes)
app.use("/api/interviewroute",interviewRouter)



app.listen(port,()=>{
    console.log("running on port:"+ port)
    connectdb()
});
