const Blog = require("../models/blogSchema");
const Comment = require("../models/commentSchema");
const User = require("../models/userSchema");
const uploadImage = require("../utils/uploadImage");
// const { verifyJWT } = require("../utils/generateToken");
async function createBlog(req,res) {
    try {
        
        const creator=req.user;
        const{title,description,draft}=req.body;
        const findUser=await User.findById(creator)
        
        if(!description||!title){
            return res.status(500).json({
                message:"please fill all the fields"
            })
        }
        if(!findUser){
            return res.status(500).json({
                message:"kon hai bhai tu mai nahi jaanta"
            })
        }
        
        const image = req.file
        
        const {secure_url,public_id}=await uploadImage(image.path)
        const blog=await Blog.create({description,title,draft,creator,image:secure_url,imageId:public_id})
        await User.findByIdAndUpdate(creator,{$push:{blogs:blog._id}})
        return res.status(200).json({
            message:"blog created successfully",
            success:true,
            blog
        })
    } catch (err) {
        return res.status(500).json({
            message:err.message,
            text:"error occured"
        })
    }
}
async function getBlog(req,res) {
    try {
        const blogs=await Blog.find({draft:false}).populate("creator")
        return res.status(200).json({
            message:"blogs fetched successfully",
            blogs
        })
    } catch (err) {
        return res.status(500).json
    }
}
async function getBlogById(req,res) {
    try {
        const {id}=req.params
        const blog=await Blog.findById(id).populate("comments").populate("creator")
        return res.status(200).json({
            message:"blog fetched successfully",
            blog,
        })
    } catch (err) {
        return res.status(500).json({
            message:err.message
        })
    }
}
async function updateBlog(req,res) {
   try {
        const creator=req.user;
        const {id}=req.params
        const{title,description,draft}=req.body;
        const blog= Blog.findById(id)
        if(!(creator==blog.creator)){
            return res.status(500).json({
                message:"you are not authorized for this action"
            })
        }
        const updatedBlog= Blog.findByIdAndUpdate(id,{
            title,
            description,
            draft,
        })
        return res.status(200).json({
            success:true,
            message:"Blog updated successfully "
        })
   } catch (err) {
        return res.status(500).json({
            message:err.message
        })
    }
}
async function deleteBlog(req,res) {
    try {
        const creator=req.user;
        const {id}=req.params
        const blog= await Blog.findById(id)
        if(!blog){
            return res.status(500).json({
                message:"blog not found"
            })
        }
        if(!(creator==blog.creator)){
            return res.status(500).json({
                message:"you are not authorized for this action"
            })
        }
        const del =await Blog.findByIdAndDelete(id)
        const b=await User.findByIdAndUpdate(creator,{$pull:{blogs:id}})
        return res.status(200).json({
            success:true,
            message:"Blog deleted successfully "
        })
    } catch (err) {
        return res.status(500).json({
            message:err.message
        })
    }  
}
async function likeBlog(req,res) {
    try {
        const creator=req.user;
        const {id}=req.params
        const blog= await Blog.findById(id)
        if(!blog){
            return res.status(500).json({
                message:"blog not found"
            })
        }
       if(!blog.likes.includes(creator)){
        await Blog.findByIdAndUpdate(id,{$push:{likes:creator}})
        return res.status(200).json({
            success:true,
            message:"Blog liked successfully "
        })
       }else{
            await Blog.findByIdAndUpdate(id,{$pull:{likes:creator}})
            return res.status(500).json({
                success:true,
                message:"Blog disliked successfully "
            })
       }
        
    } catch (err) {
        return res.status(500).json({
            message:err.message
        })
    }  
}

module.exports={
    createBlog,
    updateBlog,
    getBlog,
    getBlogById,
    deleteBlog,
    likeBlog,
}