import React from 'react'
import styles from "./card.module.css";
import axios from 'axios';
const Card = ({product}) => {
  async function handleCart(id){
    try {
      const userData = JSON.parse(localStorage.getItem("follow-along-auth-token-user-name-id"))
      const data = await axios.get(`http://localhost:8080/card/cartproduct/${id}`,
        {headers: { 
          "Authorization": userData.token 
      }}
      )
      console.log(data);
      
    } catch (error) {
      console.log(error)
      alert("something went wrong while adding to the cart")
    }
  }
  return (
    <div className={styles.card}>
        <img className={styles.productImg} src={product.images[0]} alt={product.title} />
        <h3>{product.title}</h3>
        <p>${product.price}</p>
        <button
        onClick={()=>handleCart(product.id)}
        >Add to cart</button>
    </div>
  )
}

export default Card