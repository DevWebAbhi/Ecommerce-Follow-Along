import React from "react";

const CartCard = ({ product, onQuantityChange }) => {
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
        <div className="flex items-center mt-4">
          <button
            className="bg-gray-300 text-gray-800 px-3 py-1 rounded-l-md hover:bg-gray-400"
            onClick={() => onQuantityChange(product._id, product.quantity - 1)}
          >
            -
          </button>
          <span className="px-4 py-1 border-t border-b border-gray-300">
            {product.quantity}
          </span>
          <button
            className="bg-gray-300 text-gray-800 px-3 py-1 rounded-r-md hover:bg-gray-400"
            onClick={() => onQuantityChange(product._id, product.quantity + 1)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartCard;