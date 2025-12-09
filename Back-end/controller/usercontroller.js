const user =require("../Model/user")
const postUser = async(req,res)=>{
    try{
        const{name,email,phoneNo,role}=req.body
        const newuser=new user({name,email,phoneNo,role})
        await newuser.save()
        res.status(200).json({message:"user created",data:newuser})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"error in user creation"})
    }
}
const getuser=async(req,res)=>{
    try{
        const getuser=await user.find()
        res.status(200).json({message:"user get from DB",data:getuser})
    }
    catch(error){
        console.log(error)
        res.status(500).json({messsage:"error in getting user"})
    }
}
const putUser=async(req,res)=>{
    try{
        const putUser=await user.findByIdAndUpdate(req.params.id,
            req.body,
            {new:true}
        )
        res.status(200).json({message:"data updated",data:putUser})
    }
    catch(error){
        console.log(error)
    }
}
const  deleteuser=async(req,res)=>{
    try{
        const deleteuser=await user.findByIdAndDelete(req.params.id,
            req.body,
            {new:true}
        )
        res.status(200).json({message:"user get from DB",data:deleteuser})
    }
    catch(error){
        console.log(error)
    }
}
module.exports = {postUser,getuser,deleteuser,putUser}