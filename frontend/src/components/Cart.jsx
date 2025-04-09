import React, { useEffect, useState } from 'react'
import axios from "axios";
import styles from "./products.module.css";
import CartCard from "./CartCard.jsx"
const Cart = () => {
    const [products,setProducts] = useState([]);
    async function getData(){
        
       try {
        const userData = JSON.parse(localStorage.getItem("follow-along-auth-token-user-name-id"))
        const userId = userData.id;
        const getCartData = await axios.get("http://localhost:8080/cart/cart",
            {headers: { 
                "Authorization": userData.token 
            }}
        );
        console.log(getCartData);

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
        <h1>Products</h1>
        <div className={styles.products}>
        {
            products.map((ele)=>{
                return <CartCard key={ele.id} product={ele}/>
            })
        }
    </div>
    </>
  )
}

export default Cart;