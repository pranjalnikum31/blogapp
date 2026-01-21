// import mongoose from "mongoose";

const mongoose=require("mongoose")

async function dbConnect() {
    try {
        await mongoose.connect("mongodb://localhost:27017/blogDatabase");
        console.log("db connected successfully");
    } catch (err) {
        console.log("error aa gya ");
        console.log(err);
    }
}

module.exports=dbConnect