const express = require("express");

const productModel = require("../models/productModel");
const cartModel = require("../models/cartModel");

const cartRouter = express.Router();


cartRouter.get("/cartproduct/:id",async(req,res)=>{
    console.log("cart")
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).send({message:"id is required"});
        }

        const product = await productModel.findOne({_id:id});

        if(!product){
            return res.status(404).send({message:"product not found"});
        }

        const{title,description,price,images} = product;

        const newCartProduct = await cartModel.insertOne({
            title,description,price,images,userId:req.userId
        })

        return res.status(201).send({message:"product is added to sucessfully"});

    } catch (error) {
        return res.status(500).send({message:"something went wrong"});
    }
})

cartRouter.put("/:cartproductid",async(req,res)=>{
    try {
        const {cartproductid} = req.params;
        if(!cartproductid){
            return res.status(400).send({message:"please add cart product id"});
        }
        const {noofcartitem} = req.query;
        if(noofcartitem == 0){
            const cartItemToBeDeleted = await cartModel.findByIdAndDelete({_id:cartproductid});
            if(!cartItemToBeDeleted){
                return res.status(404).send({message:"product not found"});
            }
            return res.status(200).send({message:"cart item deleted sucessfully"});
        }
        if(noofcartitem<1){
            return res.status(400).send({message:"cart item count should not be less than 1"});
        }
        const item = await cartModel.findByIdAndUpdate({_id:cartproductid},{quantity:noofcartitem});
        if(!item){
            return res.status(404).send({message:"item not found of respective id"});
        }

        return res.status(200).send({message:"item count updated sucessfully"});
    } catch (error) {
        return res.status(500).send({message:"something went wrong"});
    }
})

cartRouter.get("/",async(req,res)=>{
    try {
        const userId=req.userId;
        const cartData = await cartModel.find({userId:userId});
        console.log("cart")
        return res.status(200).send({message:"cart items",cartProducts:cartData.length>0?cartData:"no items found in cart"})
    } catch (error) {
        return res.status(500).send({message:"something went wrong"});
    }
})

module.exports = cartRouter;