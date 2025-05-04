import React, { useState } from "react";
import axios from "axios";

const countryStateCityData = {
  India: {
    states: {
      Maharashtra: ["Mumbai", "Pune", "Nagpur"],
      Bihar: ["Patna", "Gaya", "Bhagalpur"],
      Delhi: ["New Delhi"],
    },
  },
  USA: {
    states: {
      California: ["Los Angeles", "San Francisco", "San Diego"],
      Texas: ["Houston", "Dallas", "Austin"],
    },
  },
  Canada: {
    states: {
      Ontario: ["Toronto", "Ottawa"],
      Quebec: ["Montreal", "Quebec City"],
    },
  },
};

const UserAddress = () => {
  const [address, setAddress] = useState({
    country: "",
    state: "",
    city: "",
    address1: "",
    address2: "",
    zipCode: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const { country, state, city, address1, address2, zipCode } = address;
    const newErrors = {};

    if (!country) newErrors.country = "Country is required.";
    if (!state) newErrors.state = "State is required.";
    if (!city) newErrors.city = "City is required.";
    if (!address1) newErrors.address1 = "Address 1 is required.";
    if (!address2) newErrors.address2 = "Address 2 is required.";
    if (!zipCode || zipCode.length !== 6)
      newErrors.zipCode = "ZIP Code must be 6 digits.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function postAddress(event) {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      const userData =
        JSON.parse(localStorage.getItem("follow-along-auth-token-user-name-id")) || [];
      if (!userData.id) {
        alert("Please login first");
        return;
      }

      const sendAddress = await axios.post(
        `http://localhost:8080/address`,
        address,
        {
          headers: {
            Authorization: userData.token,
          },
        }
      );

      alert("Address updated successfully");
    } catch (error) {
      alert("Something went wrong");
      console.error(error);
    }
  }

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    setAddress({
      ...address,
      country: selectedCountry,
      state: "",
      city: "",
    });
  };

  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    setAddress({
      ...address,
      state: selectedState,
      city: "",
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={postAddress}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Add Address
        </h2>

        {/* Country */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Select Country
          </label>
          <select
            name="country"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.country ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
            }`}
            onChange={handleCountryChange}
            value={address.country}
          >
            <option value="">Select Country</option>
            {Object.keys(countryStateCityData).map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
        </div>

        {/* State */}
        {address.country && (
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Select State</label>
            <select
              name="state"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.state ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
              }`}
              onChange={handleStateChange}
              value={address.state}
            >
              <option value="">Select State</option>
              {Object.keys(countryStateCityData[address.country].states).map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
          </div>
        )}

        {/* City */}
        {address.state && (
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Select City</label>
            <select
              name="city"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.city ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
              }`}
              onChange={(event) =>
                setAddress({ ...address, city: event.target.value })
              }
              value={address.city}
            >
              <option value="">Select City</option>
              {countryStateCityData[address.country].states[address.state].map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
          </div>
        )}

        {/* Address 1 */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Address 1</label>
          <textarea
            name="address1"
            placeholder="Enter Address 1"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.address1 ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
            }`}
            onChange={(event) =>
              setAddress({ ...address, [event.target.name]: event.target.value })
            }
            value={address.address1}
          ></textarea>
          {errors.address1 && <p className="text-red-500 text-sm mt-1">{errors.address1}</p>}
        </div>

        {/* Address 2 */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Address 2</label>
          <textarea
            name="address2"
            placeholder="Enter Address 2"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.address2 ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
            }`}
            onChange={(event) =>
              setAddress({ ...address, [event.target.name]: event.target.value })
            }
            value={address.address2}
          ></textarea>
          {errors.address2 && <p className="text-red-500 text-sm mt-1">{errors.address2}</p>}
        </div>

        {/* ZIP Code */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">ZIP Code</label>
          <input
            type="number"
            name="zipCode"
            placeholder="Enter ZIP Code"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.zipCode ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
            }`}
            onChange={(event) =>
              setAddress({ ...address, [event.target.name]: event.target.value })
            }
            value={address.zipCode}
          />
          {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Submit Address
        </button>
      </form>
    </div>
  );
};

export default UserAddress;