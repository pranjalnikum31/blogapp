const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dbConnect=require("./config/dbConnect")
const User=require("./models/userSchema")
const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
const userRoute=require("./routes/userRoutes")
const blogRoute=require("./routes/blogRoutes");
const cloudinaryConfig = require("./config/cloudinaryConfig");
app.use(express.json());
app.use("/",userRoute)
app.use("/",blogRoute)









app.listen(3000, () => {
    console.log("server running");
    dbConnect();
    cloudinaryConfig()
});
