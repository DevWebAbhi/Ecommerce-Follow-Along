const express = require("express");
const productRouter = express.Router();
const productModel = require("../models/productModel");
const { productImages } = require("../middleware/multer");

const uploadImages = (req, res, next) => {
    productImages.array("images", 6)(req, res, (err) => {
        const { title, description, price } = req.body;

        // Validate required fields
        if (!title || !description || !price) {
            return res.status(400).json({ msg: "Please fill all fields" });
        }

        // Validate price
        if (isNaN(price) || price <= 0) {
            return res.status(400).json({ msg: "Price must be a positive number" });
        }

        // Handle file upload errors
        if (err) {
            return res.status(400).json({ msg: "File upload error", error: err.message });
        }

        next();
    });
};

// Add Product Route
productRouter.post("/addproduct", uploadImages, async (req, res) => {
    try {
        const { title, description, price } = req.body;

        // Ensure at least one image is uploaded
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ msg: "At least one image is required" });
        }

        // Construct image URLs
        const imageUrls = req.files.map(file => `http://localhost:8080/uploads/productImages/${file.filename}`);

        // Save product only if validation passes
        const newProduct = new productModel({
            title,
            description,
            price,
            images: imageUrls,
            userId: req.userId
        });

        await newProduct.save();

        return res.status(201).json({ msg: "Product added successfully", images: imageUrls });

    } catch (error) {
        console.error("Error in adding product:", error);
        return res.status(500).json({ msg: "Something went wrong", error: error.message });
    }
});

// Update Product Route
productRouter.put("/update/:id", uploadImages, async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ msg: "Please provide a valid product ID" });
        }

        const { title, description, price } = req.body;

        // Validate required fields
        if (!title || !description || !price) {
            return res.status(400).json({ msg: "Please fill all fields" });
        }

        // Validate price
        if (isNaN(price) || price <= 0) {
            return res.status(400).json({ msg: "Price must be a positive number" });
        }

        // Ensure at least one image is uploaded
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ msg: "At least one image is required" });
        }

        // Construct image URLs
        const imageUrls = req.files.map(file => `http://localhost:8080/uploads/productImages/${file.filename}`);

        const updatedProduct = await productModel.findByIdAndUpdate(
            { _id: id },
            { title, description, price, images: imageUrls },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ msg: "Product not found" });
        }

        res.status(200).json({ msg: "Product updated successfully", updatedProduct });

    } catch (error) {
        console.error("Error in updating product:", error);
        return res.status(500).json({ msg: "Something went wrong", error: error.message });
    }
});

// Delete Product Route
productRouter.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ msg: "Please provide a valid product ID" });
        }

        const deletedProduct = await productModel.findByIdAndDelete({ _id: id });
        if (!deletedProduct) {
            return res.status(404).json({ msg: "Product not found" });
        }

        return res.status(200).json({ msg: "Product deleted successfully" });

    } catch (error) {
        console.error("Error in deleting product:", error);
        return res.status(500).json({ msg: "Something went wrong", error: error.message });
    }
});

module.exports = productRouter;
