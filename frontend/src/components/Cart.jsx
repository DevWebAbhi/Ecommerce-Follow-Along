import React, { useEffect, useState } from "react";
import axios from "axios";
import CartCard from "./CartCard.jsx";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  async function getData() {
    try {
      const userData = JSON.parse(
        localStorage.getItem("follow-along-auth-token-user-name-id")
      );
      const getCartData = await axios.get("http://localhost:8080/cart", {
        headers: {
          Authorization: userData.token,
        },
      });

      const cartProducts = getCartData.data.cartProducts;
      let sum = 0;
      cartProducts.forEach((ele) => {
        sum += ele.price * ele.quantity;
      });

      setTotalPrice(sum);
      setProducts(cartProducts);
    } catch (error) {
      console.error(error);
      alert("Something went wrong while fetching cart data.");
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const handleQuantityChange = async (id, quantity) => {
    try {
      const userData = JSON.parse(
        localStorage.getItem("follow-along-auth-token-user-name-id")
      );

      if (quantity === 0) {
        await axios.put(`http://localhost:8080/cart/${id}?noofcartitem=0`, {
          headers: {
            Authorization: userData.token,
          },
        });
        setProducts(products.filter((product) => product._id !== id));
      } else {
        await axios.put(
          `http://localhost:8080/cart/${id}?noofcartitem=${quantity}`,
          {
            headers: {
              Authorization: userData.token,
            },
          }
        );
        getData();
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong while updating quantity.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Your Cart
        </h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Total Price: ${totalPrice.toFixed(2)}
        </h2>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <CartCard
                key={product._id}
                product={product}
                onQuantityChange={handleQuantityChange}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        )}
        <button
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition mt-6 block mx-auto"
          onClick={() =>
            navigate("/checkout", {
              state: { cartProducts: products },
            })
          }
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;