import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [noOfImages, setNoOfImages] = useState([1]);
  const [productDetails, setProductDetails] = useState({
    title: "",
    description: "",
    price: "",
  });
  const [productImages, setProductImages] = useState([]);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const { title, description, price } = productDetails;
    const newErrors = {};

    if (!title) newErrors.title = "Title is required.";
    if (!description) newErrors.description = "Description is required.";
    if (!price || price <= 0) newErrors.price = "Price must be greater than 0.";
    if (productImages.length === 0) newErrors.images = "At least one image is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const { title, description, price } = productDetails;
      const token = JSON.parse(localStorage.getItem("follow-along-auth-token-user-name-id"));
      if (!token) {
        alert("Please login first");
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);

      productImages.forEach((image) => formData.append("images", image));

      const response = await axios.post("http://localhost:8080/product/addproduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token.token,
        },
      });

      alert("Product added successfully!");
      console.log("Response:", response.data);
    } catch (error) {
      alert("Something went wrong while sending data");
      console.error("Error:", error);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Add Product</h2>

        {/* Title Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            type="text"
            placeholder="Enter title..."
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.title ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
            }`}
            onChange={(e) =>
              setProductDetails({ ...productDetails, title: e.target.value })
            }
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        {/* Description Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea
            placeholder="Enter description..."
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.description ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
            }`}
            onChange={(e) =>
              setProductDetails({ ...productDetails, description: e.target.value })
            }
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        {/* Price Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Price</label>
          <input
            type="number"
            placeholder="Enter price..."
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.price ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
            }`}
            onChange={(e) =>
              setProductDetails({ ...productDetails, price: e.target.value })
            }
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
        </div>

        {/* Number of Images */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Number of Images</label>
          <select
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setNoOfImages(Array(parseInt(e.target.value)).fill(1))
            }
          >
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Add Images</label>
          {noOfImages.map((_, index) => (
            <input
              key={index}
              type="file"
              accept="image/*"
              className="w-full mb-2"
              onChange={(e) => {
                const newImages = [...productImages];
                newImages[index] = e.target.files[0];
                setProductImages(newImages);
              }}
            />
          ))}
          {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Upload Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
