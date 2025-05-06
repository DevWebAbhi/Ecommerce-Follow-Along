import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  async function getAddresses() {
    try {
      const userData = JSON.parse(
        localStorage.getItem("follow-along-auth-token-user-name-id")
      );
      const response = await axios.get("http://localhost:8080/address", {
        headers: {
          Authorization: userData.token,
        },
      });
      setAddresses(response.data.addresses);
    } catch (error) {
      console.error("Error fetching addresses:", error);
      alert("Something went wrong while fetching addresses.");
    }
  }

  // Fetch cart products passed from the Cart page
  useEffect(() => {
    if (location.state && location.state.cartProducts) {
      setCartProducts(location.state.cartProducts);
    }
    getAddresses();
  }, [location.state]);

  // Handle Checkout
  async function handleCheckout() {
    if (!selectedAddress) {
      alert("Please select an address to proceed.");
      return;
    }

    try {
      const userData = JSON.parse(
        localStorage.getItem("follow-along-auth-token-user-name-id")
      );

      const productIds = cartProducts.map((product) => product.productId);
      console.log(productIds, "productIds");
      // Send order details to the backend
      await axios.post(
        "http://localhost:8080/order",
        {
          addressId: selectedAddress,
          productIDS: productIds,
        },
        {
          headers: {
            Authorization: userData.token,
          },
        }
      );

      // Remove cart items
      

      alert("Order placed successfully!");
      navigate("/"); // Navigate to the orders page
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Something went wrong during checkout.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Checkout
        </h1>

        {/* Address Selection */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Select an Address
        </h2>
        {addresses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addresses.map((address) => (
              <div
                key={address._id}
                className={`p-4 border rounded-md shadow-sm cursor-pointer ${
                  selectedAddress === address._id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedAddress(address._id)}
              >
                <h3 className="text-lg font-semibold text-blue-600 mb-2">
                  {address.address1}
                </h3>
                <p className="text-gray-700">
                  <span className="font-medium">City:</span> {address.city}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">ZIP Code:</span> {address.zipCode}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No addresses found. Please add one.</p>
        )}

        {/* Cart Products */}
        <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
          Products in Your Cart
        </h2>
        {cartProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cartProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white shadow-lg rounded-lg p-4 border border-gray-200"
              >
                <h3 className="text-lg font-bold text-gray-800">
                  {product.title}
                </h3>
                <p className="text-gray-600">${product.price}</p>
                <p className="text-gray-600">Quantity: {product.quantity}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No products in your cart.</p>
        )}

        {/* Checkout Button */}
        <button
          className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition block mx-auto"
          onClick={handleCheckout}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;