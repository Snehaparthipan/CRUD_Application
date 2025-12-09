const connectDB=require("./config/db")
const express=require("express")
const cors=require("cors")
const userroutes=require("../Back-end/Routes/userroutes")
const app=express()
const PORT=5000
app.use(cors())
app.use(express.json())
connectDB()
app.use('/api',userroutes)
app.listen(PORT,()=>{
    console.log("server run")
}
)
