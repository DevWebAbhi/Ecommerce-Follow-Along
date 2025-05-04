import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  function handleInput(e) {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  }

  const validateForm = () => {
    const newErrors = {};
    if (!loginData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!loginData.password) {
      newErrors.password = "Password is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function handleLogin(event) {
    event.preventDefault();

    if (!validateForm()) return;

    try {
      const checkUser = await axios.post(
        "http://localhost:8080/user/login",
        loginData
      );
      console.log(checkUser);
      localStorage.setItem(
        "follow-along-auth-token-user-name-id",
        JSON.stringify({
          token: checkUser.data.token,
          name: checkUser.data.name,
          id: checkUser.data.id,
          userImage: checkUser.data.userImage,
        })
      );
      alert("You successfully logged in!");
    } catch (error) {
      console.log(error);
      alert("Something went wrong while logging in.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Login
        </h2>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            placeholder="Email..."
            value={loginData.email}
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
            value={loginData.password}
            name="password"
            onChange={handleInput}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.password
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-blue-500"
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
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;