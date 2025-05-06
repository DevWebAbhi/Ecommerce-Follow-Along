import React, { useEffect, useState } from "react";
import axios from "axios";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  // Fetch orders from the backend
  async function fetchOrders() {
    try {
      const userData = JSON.parse(
        localStorage.getItem("follow-along-auth-token-user-name-id")
      );

      const response = await axios.get("http://localhost:8080/order", {
        headers: {
          Authorization: userData.token,
        },
      });

      // Access the orders array from the response
      setOrders(response.data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      alert("Something went wrong while fetching orders.");
    }
  }

  // Cancel an order
  async function cancelOrder(orderId) {
    try {
      const userData = JSON.parse(
        localStorage.getItem("follow-along-auth-token-user-name-id")
      );

      await axios.put(
        `http://localhost:8080/order/cancel/${orderId}`,
        {},
        {
          headers: {
            Authorization: userData.token,
          },
        }
      );

      alert("Order canceled successfully!");
      fetchOrders(); // Refresh orders after cancellation
    } catch (error) {
      console.error("Error canceling order:", error);
      alert("Something went wrong while canceling the order.");
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          My Orders
        </h1>
        {orders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white shadow-lg rounded-lg p-4 border border-gray-200"
              >
                <h3 className="text-lg font-bold text-gray-800">
                  Order ID: {order._id}
                </h3>
                <p className="text-gray-600">
                  <span className="font-medium">Status:</span> {order.status}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Address:</span>{" "}
                  {order.addressId?.address1}, {order.addressId?.city},{" "}
                  {order.addressId?.zipCode}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Products:</span>{" "}
                  {order.products.length}
                </p>
                {order.status === "active" && (
                  <button
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                    onClick={() => cancelOrder(order._id)}
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default MyOrders;