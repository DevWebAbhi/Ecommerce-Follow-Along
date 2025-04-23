import React, { useEffect, useState } from 'react'
import axios from "axios";
import styles from "./products.module.css";
import CartCard from "./CartCard.jsx"
import { useNavigate } from 'react-router-dom';
const Cart = () => {
    const [products,setProducts] = useState([]);
    const [totalPrice,setTotalPrice] = useState(0);
    const navigate = useNavigate();
    async function getData(){
        
       try {
        const userData = JSON.parse(localStorage.getItem("follow-along-auth-token-user-name-id"))
        const userId = userData.id;
        const getCartData = await axios.get("http://localhost:8080/cart",
            {headers: { 
                "Authorization": userData.token 
            }}
        );
        console.log(getCartData.data.cartProducts);
        let sum = 0;
        const price = getCartData.data.cartProducts.forEach((ele)=>{
            sum+=ele.price;
        })
        setTotalPrice(sum);
        setProducts(getCartData.data.cartProducts);
       } catch (error) {
        console.log(error);
        alert("")
       }
    }


    useEffect(()=>{
        getData();
    },[])

  return (
    <>
    <h2>Total Price :{totalPrice}</h2>
        <h1>Products</h1>
        <div className={styles.products}>
        {
            products.map((ele)=>{
                return <CartCard key={ele.id} product={ele}/>
            })
        }
    </div>
    <button
    style={{
        border:"1px solid",
        borderRadius:"0.4rem",
        display:"block",
        margin:"auto",
        background:"whitesmoke",
        marginTop:"1rem"
    }}
        onClick={()=>{
            navigate("/all-address");
        }}
    >Proceed to checkout</button>
    </>
  )
}

export default Cart;