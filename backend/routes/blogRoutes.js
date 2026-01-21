
const express=require("express");
const { createBlog, getBlog, getBlogById, updateBlog, deleteBlog, likeBlog } = require("../controller/blogController");
const VerifyUser = require("../middleware/auth");
const verifyUser = require("../middleware/auth");
const { addComment, deleteComment, editComment, likeComment } = require("../controller/commentController");
const Upload = require("../utils/multer");


const route=express.Router()


// blogs
route.post("/blogs",VerifyUser,Upload.single("image"),createBlog);

route.get("/blogs",getBlog);

route.get("/blogs/:id", getBlogById);

route.patch("/blogs/:id",verifyUser, updateBlog);

route.delete("/blogs/:id",verifyUser, deleteBlog);

route.post("/blogs/like/:id",verifyUser, likeBlog);

route.post("/blogs/comment/:id",verifyUser, addComment);

route.delete("/blogs/comment/:id",verifyUser, deleteComment);

route.patch("/blogs/edit-comment/:id",verifyUser, editComment);

route.patch("/blogs/like-comment/:id",verifyUser, likeComment);


module.exports=route