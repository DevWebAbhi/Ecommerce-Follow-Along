const express = require("express");
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { userImage } = require("../middleware/multer");

const userRouter = express.Router();

userRouter.post("/signup",userImage.single("image"),async(req,res)=>{

    try {
        console.log(req.file);
        const{name,email,password} = req.body;
        console.log(name,email,password)
        if(!name || !email || !password){
            return res.status(400).send({message:"All details are required"});
        }
        const user =await userModel.findOne({email});
        console.log(user)
        if(user){
            return res.status(200).send({message:"User Already Registered"});
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        await userModel.insertOne({name,email,password:hash});
        
        
        return res.status(200).send({message:"user registered sucessfully"});
    } catch (error) {
        return res.status(500).send({error});
    }
})

userRouter.post("/login",async(req,res)=>{
    try {
        const{email,password} = req.body;
        if(!email || !password){
            return  res.status(400).send({message:"All details are required"});
        }

        const user =await userModel.findOne({email});
        const matchedPass =  bcrypt.compareSync(password, hash);
        if(user && matchedPass){
            return  res.status(200).send({message:"User logged in sucessfully"});
        }
        return  res.status(401).send({message:"Entered details are wrong"});
    } catch (error) {
        return res.status(500).send({error});
    }
})


module.exports = userRouter;
