const mongoose = require("mongoose");

const schema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    addressId: { type: mongoose.Schema.Types.ObjectId, ref: "address", required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "products", required: true }],
    status: { type: String, enum: ["active", "canceled"], default: "active" } // New field
});

const orderModel = mongoose.model("orders", schema);

module.exports = orderModel;