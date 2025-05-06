import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div
          className="text-2xl font-bold cursor-pointer hover:text-gray-200"
          onClick={() => navigate('/')}
        >
          Ecommerce
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <p
            className="cursor-pointer hover:text-gray-200"
            onClick={() => navigate('/addproducts')}
          >
            Add Products
          </p>
          <p
            className="cursor-pointer hover:text-gray-200"
            onClick={() => navigate('/user-address')}
          >
            Add Address
          </p>
          <p
            className="cursor-pointer hover:text-gray-200"
            onClick={() => navigate('/all-address')}
          >
            All Address
          </p>
          <p
            className="cursor-pointer hover:text-gray-200"
            onClick={() => navigate('/myproducts')}
          >
            My Products
          </p>
          <p
            className="cursor-pointer hover:text-gray-200"
            onClick={() => navigate('/cart')}
          >
            Cart
          </p>
          <p
            className="cursor-pointer hover:text-gray-200"
            onClick={() => navigate('/myorders')}
          >
            My Orders
          </p>
          <p
            className="cursor-pointer hover:text-gray-200"
            onClick={() => navigate('/user')}
          >
            User
          </p>
        </div>

        {/* Auth Links */}
        <div className="flex space-x-4">
          <button
            className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-100"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
          <button
            className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-100"
            onClick={() => navigate('/signup')}
          >
            Signup
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;