const cloudinaryConfig = require("../config/cloudinaryConfig")

const cloudinary=require("cloudinary").v2


async function uploadImage(imagePath) {
    try {
        cloudinaryConfig()
        const result= await cloudinary.uploader.upload(imagePath,{
            folder: "blog app",
            resource_type: "image",
            quality: "auto",
            fetch_format: "auto"
        })
        return result
    } catch (err) {
        console.log(err);
        
    }
    
}
module.exports=uploadImage