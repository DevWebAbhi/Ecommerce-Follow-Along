import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from "./navbar.module.css";
const Navbar = () => {
    const navigate = useNavigate();
  return (
    <div
    className={styles.navbar}
    >
        <div
        onClick={()=>{
            navigate("/");
        }}
        >
            <h1>Home</h1>
        </div>
        <div>
            <p onClick={()=>{
                navigate("/addproducts");
            }}>Add Products</p>
        </div>
        <div>
            <div
            onClick={()=>{
                navigate("/myproducts");
            }}
            >My Products</div>
        </div>
        <div>
            <div
            onClick={()=>navigate("/cart")}
            >Cart</div>
        </div>
        <div>
        <div
        onClick={()=>{
            navigate("/login");
        }}
        >Login</div>
        <div
        onClick={()=>{
            navigate("/signup");
        }}
        >Signup</div>
        </div>
        
    </div>
  )
}

export default Navbar