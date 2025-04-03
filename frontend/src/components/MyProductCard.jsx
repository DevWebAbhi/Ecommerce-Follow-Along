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
        <img className={styles.productImg} src={product.images[0]} alt={product.title} />
        <h3>{product.title}</h3>
        <p>${product.price}</p>
        <div
          style={{
            display:"flex",
            justifyContent:"space-around",
            padding:"0.5rem"
          }}
        >
            <buttons className="btn-del-edt" style={{
              backgroundColor:"gray",
              border:"1px solid",
              borderRadius:"0.3rem",
              width:"3rem",display:"flex",
              justifyContent:"space-around",
              margin:"auto"
            }}>Edit</buttons>
            <buttons className="btn-del-edt" style={{
              backgroundColor:"gray",
              border:"1px solid",
              borderRadius:"0.3rem",
              width:"3rem",display:"flex",
              justifyContent:"space-around",
              margin:"auto"
            }}
            onClick={()=>handleDelete(product._id)}
            >Delete</buttons>
        </div>
    </div>
  )
}

export default MyProductCard;