const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        minlength:[3,"enter minimum 3 letters"],
        require:true
    },
    email:{
        type:String,
        minlength:[5,"must be 3 letter"],
        unique:true,
        require:true,
        match:[/^\S+@\S+\.\S+$/,"plese enter valid email"]
    },
    phoneNo:{
        type:Number,
        minlength:[10],
        unique:true,
        require:true
    },
    role:{
        type:String,
        minlength:[5,"enter min 5 letter"],
        require:true
    }},
    {timestamps:true}
)
module.exports=mongoose.model('User',userSchema)