import React, { useEffect, useState } from "react";
import axios from "axios";
import MyProductCard from "./MyProductCard";

const MyProducts = () => {
  const [products, setProducts] = useState([]);

  // Fetch products for the logged-in user
  async function getData() {
    try {
      const response = await axios.get("http://localhost:8080/allproducts");
      const userData = JSON.parse(
        localStorage.getItem("follow-along-auth-token-user-name-id")
      );

      const userProducts = response.data.products.filter(
        (product) => product.userId === userData.id
      );

      setProducts(userProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  // Handle product deletion
  const handleDelete = (id) => {
    setProducts(products.filter((product) => product._id !== id));
  };

  // Handle product editing (placeholder for now)
  const handleEdit = (product) => {
    alert(`Edit functionality for product: ${product.title}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          My Products
        </h1>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <MyProductCard
                key={product._id}
                product={product}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default MyProducts;