const mongoose = require("mongoose");

const schema = mongoose.Schema({
    addressId:{ type: mongoose.Schema.Types.ObjectId, ref: "address", required: true },
    products:[{ type: mongoose.Schema.Types.ObjectId, ref: "cart", required: true }]
})

const orderModel = mongoose.model("orders",schema);

module.exports = orderModel;