import React from 'react'
import styles from "./card.module.css";
const MyProductCard = ({product}) => {
  return (
    <div className={styles.card}>
        <img className={styles.productImg} src={product.images[0]} alt={product.title} />
        <h3>{product.title}</h3>
        <p>${product.price}</p>
        <div>
            <buttons className="btn-del-edt">Edit</buttons>
            <buttons className="btn-del-edt">Delete</buttons>
        </div>
    </div>
  )
}

export default MyProductCard;