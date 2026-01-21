const mongoose=require("mongoose")
const User=require("../models/userSchema")
const bcrypt=require("bcrypt");
const {generateJWT} = require("../utils/generateToken");
async function createUser(req,res) {
    const { name, password, email } = req.body;
    try {
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "please fill name"
            });
        }
        if (!password) {
            return res.status(400).json({
                success: false,
                message: "please fill password"
            });
        }
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "please fill email"
            });
        }
        const checkForExistingUser=await User.findOne({email})
        if(checkForExistingUser){
            return res.status(500).json({
                success:false,
                message:"user already registered with this email"
            })
        }
        const hashedPassword=await bcrypt.hash(password,10)
        const newUser = await User.create({
            name,
            email,
            password:hashedPassword
        });
        let token = await generateJWT({email : newUser.email,id: newUser._id})
        return res.status(200).json({
            success: true,
            message: "success",
            user:newUser,
            token
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "error",
            error: err.message
        });
    }
}

async function login(req,res) {
    const { email, password } = req.body;

    
    try {
        if (!password) {
            return res.status(400).json({
                success: false,
                message: "please fill password"
            });
        }
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "please fill email"
            });
        }
        const checkForExistingUser=await User.findOne({email})
        if(!checkForExistingUser){
            return res.status(400).json({
                success:false,
                message:"user not exist"
            })
        }
        // if(!(checkForExistingUser.password==password)){
        //     return res.status(400).json({
        //         success:false,
        //         message:"incorrect password"
        //     })
        // }
        let checkForPass=await bcrypt.compare(password,checkForExistingUser.password,)
        if(!checkForPass){
            return res.status(400).json({
                success:false,
                message:"incorrect password"
            })
        }
        let token = await generateJWT({email : checkForExistingUser.email,id: checkForExistingUser._id})
        
        return res.status(200).json({
            success: true,
            message: "logged in successfully",
            user:{name:checkForExistingUser.name,
                email:checkForExistingUser.email
            },
            token
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "error",
            error: err.message
        });
    }
}

async function getUser(req,res) {
    try {
        const users = await User.find({});
        return res.status(200).json({
            success: true,
            message: "successfully got user",
            users
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "error while fetching the user"
        });
    }
}


async function getUserById(req,res) {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            });
        }
        return res.status(200).json({
            success: true,
            user
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "error while fetching the user"
        });
    }
}


async function updateUser(req,res) {
    try {
        const id = req.params.id;
        const updateUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (!updateUser) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "user updated successfully",
            updateUser
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "error while updating the user"
        });
    }
}


async function deleteUser(req,res) {
    try {
        const id = req.params.id;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "user deleted successfully"
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "error while deleting the user"
        });
    }
}

module.exports={
    createUser,
    getUser,
    getUserById,
    updateUser,
    deleteUser,
    login
}
