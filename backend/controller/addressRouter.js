const express = require("express");

const addressRouter = express.Router();

const addressModel = require("../models/addressSchema");

// Fetch all addresses for the logged-in user
addressRouter.get("/", async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(401).send({ message: "Unauthorized access" });
        }

        const addresses = await addressModel.find({ userId: req.userId });
        if (addresses.length === 0) {
            return res.status(404).send({ message: "No addresses found" });
        }

        res.status(200).send({ message: "Addresses fetched successfully", addresses });
    } catch (error) {
        console.error("Error fetching addresses:", error);
        return res.status(500).send({ message: "Something went wrong", error: error.message });
    }
});

// Add a new address for the logged-in user
addressRouter.post("/", async (req, res) => {
    try {
        const { country, city, address1, address2, zipCode } = req.body;

        // Validate required fields
        if (!country || !city || !address1 || !address2 || !zipCode) {
            return res.status(400).send({ message: "All fields are required" });
        }

        // Validate ZIP Code length
        if (zipCode.length !== 6 || isNaN(zipCode)) {
            return res.status(400).send({ message: "ZIP Code must be a 6-digit number" });
        }

        if (!req.userId) {
            return res.status(401).send({ message: "Unauthorized access" });
        }

        // Save the address
        const newAddress = new addressModel({
            country,
            city,
            address1,
            address2,
            zipCode,
            userId: req.userId,
        });

        await newAddress.save();
        return res.status(201).send({ message: "Address added successfully" });
    } catch (error) {
        console.error("Error adding address:", error);
        return res.status(500).send({ message: "Something went wrong", error: error.message });
    }
});

module.exports = addressRouter;