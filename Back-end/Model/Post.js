const mongoose=require("mongoose")
const postSchema=new mongoose.Schema({
    post:{
        type:String,
        minlength:[3,"enter minimum 3 letters"],
        require:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,

       ref:"User",
           require:true
    }},
   
    {timestamps:true}
)
module.exports= mongoose.models.Post || mongoose.model('Post',postSchema)