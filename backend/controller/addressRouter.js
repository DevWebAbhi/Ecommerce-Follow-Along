const express = require("express");

const addressRouter = express.Router();

const addressModel = require("../models/addressSchema");

addressRouter.get("/",async(req,res)=>{
    try {
        const addresses = await addressModel.find({userId:req.userId});
        res.status(200).send({message:"address feached sucessfully",addresses});
    } catch (error) {
        return res.status(500).send({message:"something went wrong"});
    }
});


addressRouter.post("/",async(req,res)=>{
    console.log(req.userId,"nbjchbdsjbh j")
    try {
        const {country,city,address1,address2,zipCode} = req.body;

        if(!country || !city || !address1 || !address2 || !zipCode){
            return res.status(400).send({
                message:"All fields are required",
            });
        }


        await addressModel({
            country,city,address1,address2,zipCode,userId:req.userId
        }).save();
        return res.status(200).send({message:"address added sucessfully"});
    } catch (error) {
        console.log(error)
        return res.status(500).send({message:"something went wrong"});
    }
})


module.exports = addressRouter;