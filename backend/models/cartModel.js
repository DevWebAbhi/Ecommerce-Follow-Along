const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    images: { type: [String], required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "products", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    quantity:{type:Number,required:true,default:1} 
}, { timestamps: true }); 

const cartModel = mongoose.model("cart", cartSchema);

module.exports = cartModel;
