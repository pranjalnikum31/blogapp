const cloudinary=require("cloudinary").v2
async function cloudinaryConfig() {
    try {
        cloudinary.config({ 
            cloud_name: 'ddixxeeol', 
            api_key: '446872145934371', 
            api_secret: 'I4Hxf2rcCyTMTYG-t5D8j2dKOY4' // Click 'View API Keys' above to copy your API secret
        });
        console.log("cloudinary config successfull");
        
    } catch (err) {
        console.log(err);
        
    }
}
module.exports=cloudinaryConfig;