const asyncHandler=require("express-async-handler");
const User=require("../models/userModel");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const { Connection } = require("mongoose");
//@desc Register a user
//@route Get/api/users/register
//@access private
const registerUser=asyncHandler(async(req,res)=>{
    const {userName, email,password}=req.body;
    if(!userName || !email ||!password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable=await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already availbale");
    }
    //hash password
    const hashPassword= await bcrypt.hash(password,10)
    const user=await User.create({
        userName,
        email,
        password: hashPassword
    });
    console.log(`User created ${user}`);
    if(user){
        res.status(201).json({_id: user.id,
        email:user.email})
    }else{
        res.status(400);
        throw new Error("User not valid");
    }
    res.json({message:"User Created Successfully"});
});
//@desc login user
//@route Get/api/users/login
//@access private
const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user=await User.findOne({email});
    //Compare password with hashed password
    if(user && (await bcrypt.compare(password,user.password))){
        //provide access token
        const accessToken=jwt.sign({
            user:{
                userName:user.userName,
                email: user.email,
                id: user.id
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"15m"});
        res.status(200).json({accessToken});
    }
    else{
        res.status(401)
        throw new Error("Password is not valid");
    }
    res.json({message:"login user"});
});
//@desc current user
//@route Get/api/users/current
//@access private
const currentUser=asyncHandler(async(req,res)=>{
    res.json(req.user);
});
module.exports={registerUser,loginUser,currentUser};