import React from "react";
import axios from "axios";

const Card = ({ product }) => {
  async function handleCart(id) {
    try {
      const userData = JSON.parse(
        localStorage.getItem("follow-along-auth-token-user-name-id")
      );

      const response = await axios.get(
        `http://localhost:8080/cart/cartproduct/${id}`,
        {
          headers: {
            Authorization: userData.token,
          },
        }
      );

      alert(response.data.message);
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Something went wrong while adding to the cart.");
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

      {/* Add to Cart Button */}
      <div className="px-4 py-2 bg-gray-100">
        <button
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          onClick={() => handleCart(product._id)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;