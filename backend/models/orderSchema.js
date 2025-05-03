const mongoose = require("mongoose");

const schema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    addressId:{ type: mongoose.Schema.Types.ObjectId, ref: "address", required: true },
    products:[{ type: mongoose.Schema.Types.ObjectId, ref: "cart", required: true }]
})

const orderModel = mongoose.model("orders",schema);

module.exports = orderModel;