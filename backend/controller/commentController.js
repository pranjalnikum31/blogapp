const Blog = require("../models/blogSchema");
const Comment = require("../models/commentSchema");


async function addComment(req,res) {
    try {
        const creator=req.user;
        const {id}=req.params
        const {comment}=req.body
        if(!comment){
            return res.status(500).json({
                message:"please enter the comment"
            })
        }
        const blog= await Blog.findById(id)
        if(!blog){
            return res.status(500).json({
                message:"blog not found"
            })
        }
        const newComment=await Comment.create({comment,blog:id,user:creator})
        await Blog.findByIdAndUpdate(id,{$push:{comments:newComment._id }})
        return res.status(200).json({
            success:true,
            message:"comment added successfully"
        })
    } catch (err) {
        return res.status(500).json({
            message:err.message
        })
    }  
}
async function deleteComment(req,res) {
    try {
        const userId=req.user;
        const {id}=req.params
        const comment=await Comment.findById(id).populate({
            path:"blog",
            select:"creator"
        })
        
        if(!comment){
            return res.status(500).json({
                message:"please enter the comment"
            })
        }
        if((comment.user!=userId) && (comment.blog.creator!=userId)){
            return res.status(500).json({
                message:"not authorized for this action"
            })
        }
        await Blog.findByIdAndUpdate(comment.blog._id,{$pull:{comments:id}})
        await Comment.findByIdAndDelete(id)
        return res.status(200).json({
            success:true,
            message:"comment deleted successfully"
        })
    } catch (err) {
        return res.status(500).json({
            message:err.message
        })
    }  
}
async function editComment(req,res) {
    try {
        const userId=req.user;
        const {id}=req.params
        const {updateComment}=req.body
        const comment=await Comment.findById(id)
        if(!comment){
            return res.status(500).json({
                message:"comment not founde"
            })
        }
        if(comment.user!=userId){
            return res.status(400).json({
                success:false,
                message:"you are not valid user to edit this"
            })
        }
        await Comment.findByIdAndUpdate(id,{comment:updateComment})
        return res.status(200).json({
            success:true,
            message:"comment edited successfully"
        })
    } catch (err) {
        return res.status(500).json({
            message:err.message
        })
    }  
}
async function likeComment(req,res) {
    try {
        const userId=req.user;
        const {id}=req.params
        const comment= await Comment.findById(id)
        if(!comment){
            return res.status(500).json({
                message:"comment not found"
            })
        }
       if(!comment.likes.includes(userId)){
        await Comment.findByIdAndUpdate(id,{$push:{likes:userId}})
        return res.status(200).json({
            success:true,
            message:"comment liked successfully "
        })
       }else{
            await Comment.findByIdAndUpdate(id,{$pull:{likes:userId}})
            return res.status(500).json({
                success:true,
                message:"comment disliked successfully "
            })
       }
        
    } catch (err) {
        return res.status(500).json({
            message:err.message
        })
    }  
}
module.exports={
    addComment,
    deleteComment,
    editComment,
    likeComment
}