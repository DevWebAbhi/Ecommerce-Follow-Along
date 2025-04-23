const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    country: { type: String, required: true },
    address1: { type: String, required: true },
    address2: { type: String, required: true },
    city: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    zipCode: { type: Number, required: true } 
});

const addressModel = mongoose.model("address",addressSchema);

module.exports = addressModel;