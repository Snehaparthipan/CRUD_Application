const mongoose=require("mongoose")
require('dotenv').config()
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.STRING)
        console.log("DB CONNECTED")
    }
    catch(error){
        consol.log(error)
    }
}
module.exports=connectDB