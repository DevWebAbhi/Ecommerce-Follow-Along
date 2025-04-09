import React from 'react'
import styles from "./card.module.css";
import axios from "axios";
const MyProductCard = ({product}) => {

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
       
    </div>
  )
}

export default MyProductCard;