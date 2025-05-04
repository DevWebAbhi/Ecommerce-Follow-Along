const express = require("express");

const orderRouter = express.Router();

const orderModel = require("../models/orderSchema");

const cartProducts = require("../models/cartModel");

const productModel = require("../models/productModel");

const userModel = require("../models/userModel");

const addressModel = require("../models/addressSchema");
const cartModel = require("../models/cartModel");

const mailer = require("../nodemailer");

orderRouter.post("/", async (req, res) => {
  try {
    const { addressId, productIDS } = req.body;

    if (!addressId || !productIDS) {
      return res
        .status(400)
        .send({ message: "Please provide address ID and product IDs" });
    }

    const address = await addressModel.findOne({ _id: addressId });
    if (!address) {
      return res.status(404).send({ message: "Address not found" });
    }

    const products = await cartModel.find({ _id: { $in: productIDS } });
    if (products.length < 1) {
      return res.status(404).send({ message: "Products not found" });
    }

    const userId = req.userId;

    // Create the order
    const newOrder = await orderModel.create({
      userId,
      addressId,
      products: productIDS,
    });

    // Remove products from the cart
    await cartModel.deleteMany({ _id: { $in: productIDS } });

    return res.status(200).send({ message: "Order placed successfully", newOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    return res.status(500).send({ message: "Something went wrong" });
  }
});

orderRouter.get("/", async (req, res) => {
  try {
    const userId = req.userId;
    console.log(userId);
    const orders = await orderModel.findOne({ userId });
    console.log(orders);
    const allProductsIds = orders.products;
    console.log(allProductsIds);
    let ids = [];
    for (let i = 0; i < allProductsIds.length; i++) {
      ids[i] = allProductsIds[i].substring(12, 37);
    }
    console.log(ids);
    const products = cartModel.find({ _id: allProductsIds[0] });

    if (products.length < 1) {
      return res.status(404).send({ message: "Products not found" });
    }

    return res.status(200).send({ message: "Products order successfully", products });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong" });
  }
});

module.exports = orderRouter;