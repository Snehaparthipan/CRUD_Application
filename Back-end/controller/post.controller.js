const Post =require("../Model/Post.js")
const addPost = async(req,res)=>{
    try{
        const{post,user}=req.body
        const newPost=new Post({post, user})
        const postData = await newPost.save()
        res.status(200).json({message:"user created",data:postData})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"error in user creation"})
    }
}
const getPost=async(req,res)=>{
    try{
        const getPost=await Post.find().populate("user")
        res.status(200).json({message:"user get from DB",data:getPost})
    }
    catch(error){
        console.log(error)
        res.status(500).json({messsage:"error in getting user"})
    }
}
module.exports={addPost,getPost}