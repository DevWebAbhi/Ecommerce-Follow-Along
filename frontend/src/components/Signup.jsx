import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [SignupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  function handleInput(e) {
    setSignupData({ ...SignupData, [e.target.name]: e.target.value });
  }

  const validateForm = () => {
    const newErrors = {};
    if (!SignupData.name) newErrors.name = "Name is required.";
    if (!SignupData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(SignupData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!SignupData.password) {
      newErrors.password = "Password is required.";
    } else if (SignupData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function handleSignup(event) {
    event.preventDefault();

    if (!validateForm()) return;

    try {
      const formData = new FormData();
      formData.append("name", SignupData.name);
      formData.append("email", SignupData.email);
      formData.append("password", SignupData.password);
      if (image) {
        formData.append("image", image);
      }

      await axios.post("http://localhost:8080/user/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("You successfully signed up!");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleSignup}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Signup
        </h2>

        {/* Image Preview */}
        {image && (
          <div className="mb-4">
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="w-24 h-24 rounded-full mx-auto object-cover"
            />
          </div>
        )}

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Upload Your Image
          </label>
          <input
            type="file"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(event) => setImage(event.target.files[0])}
          />
        </div>

        {/* Name Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            placeholder="Name..."
            value={SignupData.name}
            name="name"
            onChange={handleInput}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.name ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
            }`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            placeholder="Email..."
            value={SignupData.email}
            name="email"
            onChange={handleInput}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.email ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
            }`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Password</label>
          <input
            type="password"
            placeholder="Password..."
            value={SignupData.password}
            name="password"
            onChange={handleInput}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.password ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
