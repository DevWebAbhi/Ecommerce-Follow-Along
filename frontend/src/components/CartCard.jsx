import React, { useState } from 'react'
import styles from "./card.module.css";
import axios from "axios";
const MyProductCard = ({product}) => {
    const [quantity,setQuantity] = useState(1);
  async function handleDelete(id){
    try {
      const token = JSON.parse(localStorage.getItem("follow-along-auth-token-user-name-id"));
      if (!token) {
          alert("Please login first");
          return;
      }
      console.log(token,id)
      await axios.delete(`http://localhost:8080/product/delete/${id}`,{
        headers: { 
            "Authorization": token.token 
        }
    });
    } catch (error) {
      alert("something went wrong");
      console.log(error)
    }
  }
  return (
<div className={styles.card}>
        <img className={styles.productImg} src={product.images[0]} alt={product.title} />
        <h3>{product.title}</h3>
        <p>${product.price}</p>
        <div>
          <button
          onClick={()=>setQuantity(quantity-1)}
          >-</button>
          <button>{quantity}</button>
          <button
           onClick={()=>setQuantity(quantity+1)}
          >+</button>
        </div>
    </div>
  )
}

export default MyProductCard;