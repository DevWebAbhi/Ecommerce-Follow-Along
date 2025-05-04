import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const userData =
  JSON.parse(localStorage.getItem("follow-along-auth-token-user-name-id")) || [];

const User = () => {
  const [addresses, setAddresses] = useState([]);
  const navigate = useNavigate();

  // Fetch user addresses
  async function getAddresses() {
    try {
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

  useEffect(() => {
    getAddresses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        {/* User Profile Section */}
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg mx-auto">
          {/* User Image */}
          <img
            src={userData.userImage}
            alt="User"
            className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-blue-500"
          />

          {/* User Name */}
          <h3 className="text-2xl font-bold text-gray-800 mt-4">{userData.name}</h3>

          {/* Add Address Button */}
          <button
            className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
            onClick={() => {
              navigate("/user-address");
            }}
          >
            Add Address
          </button>

          {/* User Addresses Section */}
          <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">
            Your Addresses
          </h2>
          {addresses.length > 0 ? (
            <div className="space-y-4">
              {addresses.map((address, idx) => (
                <div
                  key={address._id}
                  className="bg-gray-100 p-4 rounded-md shadow-sm border border-gray-300"
                >
                  <h3 className="text-lg font-semibold text-blue-600 mb-2">
                    {`Address ${idx + 1}`}
                  </h3>
                  <p className="text-gray-700">
                    <span className="font-medium">Country:</span> {address.country}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">City:</span> {address.city}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Address 1:</span> {address.address1}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Address 2:</span> {address.address2}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">ZIP Code:</span> {address.zipCode}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No addresses found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;