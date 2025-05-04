import React, { useEffect, useState } from "react";
import axios from "axios";

const AllAddress = () => {
  const [address, setAddress] = useState([]);

  async function getAddress() {
    try {
      const userData = JSON.parse(
        localStorage.getItem("follow-along-auth-token-user-name-id")
      );
      const response = await axios.get("http://localhost:8080/address", {
        headers: {
          Authorization: userData.token,
        },
      });
      setAddress(response.data.addresses);
      console.log(response);
      alert("Data fetched successfully");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  }

  useEffect(() => {
    getAddress();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          All Addresses
        </h1>
        {address.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {address.map((ele, idx) => (
              <div
                key={ele._id}
                className="bg-white shadow-lg rounded-lg p-6 border border-gray-200"
              >
                <h2 className="text-xl font-semibold text-blue-600 mb-4">
                  {`Address ${idx + 1}`}
                </h2>
                <p className="text-gray-700">
                  <span className="font-medium">Country:</span> {ele.country}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">City:</span> {ele.city}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Address 1:</span> {ele.address1}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Address 2:</span> {ele.address2}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">ZIP Code:</span> {ele.zipCode}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No addresses found.</p>
        )}
      </div>
    </div>
  );
};

export default AllAddress;