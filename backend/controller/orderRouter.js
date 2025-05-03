const express = require("express");

const orderRouter = express.Router();

const orderModel = require("../models/orderSchema");

const cartProducts = require("../models/cartModel");

const productModel = require("../models/productModel");

const userModel = require("../models/userModel");

const addressModel = require("../models/addressSchema");
const cartModel = require("../models/cartModel");

const mailer = require("../nodemailer")

orderRouter.post("/",async(req,res)=>{
    console.log("addressId,productIDS")
    try {
        const {addressId,productIDS} = req.body;
        
        if(!addressId || !productIDS){
            return res.status(400).send({message:"please add address id and product id"});
        }

        const address =await addressModel.findOne({_id:addressId});
        if(!address){
            return res.status(404).send({message:"address not found"});
        }
        const products = cartModel.find({_id:{$in:productIDS}})

        if(products.length<1){
            return res.status(404).send({message:"products not found"});
        }
        const userId = req.userId;

        const postOrder = await orderModel({userId,addressId,products:productIDS}).save();

        const user =await userModel.findOne({_id:req.userId});

        await mailer(user.email,"Order Confirmed",products+" "+address);

        return res.status(200).send({message:"products order sucessfully"});

    } catch (error) {
        console.log(error)
        return res.status(500).send({message:"something went wrong"});
    }
})


orderRouter.get("/",async(req,res)=>{
    try {
        
        const userId = req.userId;
        console.log(userId)
        const orders = await orderModel.findOne({userId});
        console.log(orders)
        const allProductsIds = orders.products;
        console.log(allProductsIds)
        let ids = [];
        for(let i=0;i<allProductsIds.length;i++){
            ids[i] = allProductsIds[i].substring(12,37);
        }
        console.log(ids);
        const products = cartModel.find({_id:allProductsIds[0]});

        if(products.length<1){
            return res.status(404).send({message:"products not found"});
        }

        return res.status(200).send({message:"products order sucessfully",products});

    } catch (error) {
        console.log(error);
        return res.status(500).send({message:"something went wrong"});
    }
})





module.exports = orderRouter;