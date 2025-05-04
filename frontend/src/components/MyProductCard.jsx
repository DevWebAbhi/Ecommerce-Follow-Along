import React from "react";
import axios from "axios";

const MyProductCard = ({ product, onEdit, onDelete }) => {
  async function handleDelete(id) {
    try {
      const token = JSON.parse(
        localStorage.getItem("follow-along-auth-token-user-name-id")
      );
      if (!token) {
        alert("Please login first");
        return;
      }

      await axios.delete(`http://localhost:8080/product/delete/${id}`, {
        headers: {
          Authorization: token.token,
        },
      });

      alert("Product deleted successfully!");
      onDelete(id); // Update the parent component after deletion
    } catch (error) {
      alert("Something went wrong while deleting the product.");
      console.error(error);
    }
  }

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      {/* Product Image */}
      <img
        className="w-full h-48 object-cover"
        src={product.images[0]}
        alt={product.title}
      />

      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{product.title}</h3>
        <p className="text-gray-600">${product.price}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center px-4 py-2 bg-gray-100">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          onClick={() => onEdit(product)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          onClick={() => handleDelete(product._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default MyProductCard;