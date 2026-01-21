
const express=require("express");
const { createUser, getUser, getUserById, updateUser, deleteUser, login } = require("../controller/userController");
const route=express.Router()

// users
route.post("/signup",createUser );

route.post("/signin",login );

route.get("/users", getUser);

route.get("/users/:id", getUserById);

route.patch("/users/:id",updateUser );

route.delete("/users/:id", deleteUser );

module.exports=route