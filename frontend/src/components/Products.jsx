import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

const Products = () => {
  const [products, setProducts] = useState([]);

  function getData() {
    axios
      .get("http://localhost:8080/allproducts")
      .then((data) => {
        console.log(data);
        setProducts(data.data.products);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((ele) => {
            return <Card key={ele._id} product={ele} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Products;