const express = require("express");

const productModel = require("../models/productModel");
const cartModel = require("../models/cartModel");

const cartRouter = express.Router();

// Add product to cart
cartRouter.get("/cartproduct/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    console.log(userId)

    if (!id) {
      return res.status(400).send({ message: "Product ID is required" });
    }

    const product = await productModel.findOne({ _id: id });
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    const { title, description, price, images } = product;

    // Check if the product is already in the cart
    const existingCartItem = await cartModel.findOne({ productId: id, userId });
    if (existingCartItem) {
      // If the product is already in the cart, increment the quantity
      existingCartItem.quantity += 1;
      await existingCartItem.save();
      return res.status(200).send({ message: "Product quantity updated in cart" });
    }

    // Add new product to the cart
    const newCartProduct = await cartModel.create({
      title,
      description,
      price,
      images,
      productId: id,
      userId,
      quantity: 1,
    });

    return res.status(201).send({ message: "Product added to cart successfully", newCartProduct });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return res.status(500).send({ message: "Something went wrong" });
  }
});

// Fetch all cart items for the logged-in user
cartRouter.get("/", async (req, res) => {
  try {
    const userId = req.userId;
    console.log(userId,"userId")
    const cartData = await cartModel.find({ userId });
    return res.status(200).send({
      message: "Cart items fetched successfully",
      cartProducts: cartData.length > 0 ? cartData : [],
    });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return res.status(500).send({ message: "Something went wrong" });
  }
});

// Update cart item quantity or remove item
cartRouter.put("/:cartproductid", async (req, res) => {
  try {
    const { cartproductid } = req.params;
    const { noofcartitem } = req.query;

    if (!cartproductid) {
      return res.status(400).send({ message: "Please provide cart product ID" });
    }

    if (noofcartitem == 0) {
      const cartItemToBeDeleted = await cartModel.findByIdAndDelete(cartproductid);
      if (!cartItemToBeDeleted) {
        return res.status(404).send({ message: "Product not found in cart" });
      }
      return res.status(200).send({ message: "Cart item deleted successfully" });
    }

    if (noofcartitem < 1) {
      return res
        .status(400)
        .send({ message: "Cart item count should not be less than 1" });
    }

    const item = await cartModel.findByIdAndUpdate(
      cartproductid,
      { quantity: noofcartitem },
      { new: true }
    );
    if (!item) {
      return res
        .status(404)
        .send({ message: "Item not found for the respective ID" });
    }

    return res.status(200).send({ message: "Item count updated successfully", item });
  } catch (error) {
    console.error("Error updating cart item:", error);
    return res.status(500).send({ message: "Something went wrong" });
  }
});

module.exports = cartRouter;