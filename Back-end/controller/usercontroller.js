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


// jwt tokens

const jwt=require("jsonwebtoken")
const bcrypt=require('bcrypt')
const SECRET_KEY="your secret key"
const hashPassword=bcrypt.hashSync("admin123",10)

const users=[{
    id:1,
    username:"admin",
    password:hashPassword
}]

const genToken= async (req,res)=> {
    
        const {username,password}=req.body
        const user=users.find(u=>u.username===username)
        if(!user)return res.status(401).json({message:'invalid username'})
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch)return res.status(401).json({message:'invalid password'})
            const token=jwt.sign({userID:user.id},SECRET_KEY,{expiresIn:'1h'})
        res.json({message:"login successful",token})
   
}

function verifyToken(req,res,next){
    const authheader=req.headers["authorization"]
    const token=authheader && authheader.split(' ')[1]
    if(!token)return res.status(401).json({message:'no token provided'})
        try {
            const decode=jwt.verify(token,SECRET_KEY)
            req.user=decode
            next()
            
        } catch (error) {
            console.log(error)
        }
}

const getToken=(req,res)=>{
    res.json({message:`welcome user ${req.user.userID}`,status:"assess granted"}
    )
}
module.exports = {postUser,getuser,deleteuser,putUser,genToken,verifyToken,getToken}