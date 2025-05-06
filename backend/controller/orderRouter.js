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

    const products = await productModel.find({ _id: { $in: productIDS } });
    console.log(products, "products");
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
    const delData = await cartModel.deleteMany({ productId: { $in: productIDS } });
    console.log(delData, "deleted data");
    return res.status(200).send({ message: "Order placed successfully", newOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    return res.status(500).send({ message: "Something went wrong" });
  }
});

orderRouter.get("/", async (req, res) => {
  try {
    const userId = req.userId;


    // Fetch all active orders for the user (optional: filter by status)
    const orders = await orderModel
      .find({ userId }) // Filter by active status if needed
      .populate("addressId")
      .populate("products");

    if (!orders || orders.length === 0) {
      return res.status(404).send({ message: "No orders found" });
    }

    return res.status(200).send({ message: "Orders fetched successfully", orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).send({ message: "Something went wrong" });
  }
});

orderRouter.put("/cancel/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;

    // Find the order by ID
    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.status(404).send({ message: "Order not found" });
    }

    // Check if the order is already canceled
    if (order.status === "canceled") {
      return res.status(400).send({ message: "Order is already canceled" });
    }

    // Mark the order as canceled
    order.status = "canceled";
    await order.save();

    return res.status(200).send({ message: "Order canceled successfully", order });
  } catch (error) {
    console.error("Error canceling order:", error);
    return res.status(500).send({ message: "Something went wrong" });
  }
});

module.exports = orderRouter;