import React, { useEffect } from 'react'
import { useNavigate ,useSearchParams} from 'react-router-dom'
import styles from "./navbar.module.css";
const Navbar = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(()=>{
        const userData = JSON.parse(localStorage.getItem("follow-along-auth-token-user-name-id")) || [];
        
        console.log(userData)
        setSearchParams('userImage',userData.userImage);
    },[])
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
        <div
        onClick={()=>navigate("/user-address")}
        >Add Address</div>
        <div
        onClick={()=>navigate("/all-address")}
        >All Address</div>
        <div>All Address</div>
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
                onClick={
                    ()=>navigate('/user')
                }
                >User</div>
            </div>
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
        
    
  )
}

export default Navbar