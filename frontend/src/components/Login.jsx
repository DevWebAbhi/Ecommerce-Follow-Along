import React, { useState } from 'react'
import styles from "./login.module.css";
import axios from 'axios';
const Login = () => {
    const[loginData,setLoginData] = useState({
        email:"",
        password:""
    })

    function handleInput(e){
        setLoginData({...loginData,[e.target.name]:e.target.value})
    }


   async function handleLogin(event){
        event.preventDefault();
        if(loginData.email == ""){
            alert("Please enter email...");
            return;
        }

        if(loginData.password == ""){
            alert("Please enter password...");
            return;
        }
        try {
            const checkUser = await axios.post("http://localhost:8080/user/login",loginData);
           console.log(checkUser)
           localStorage.setItem("follow-along-auth-token-user-name-id",JSON.stringify({token:checkUser.data.token,name:checkUser.data.name,id:checkUser.data.id,userImage:checkUser.data.userImage}))
            alert("You sucessfully loged in");
        } catch (error) {
            console.log(error);
            alert("Someting went wrong while logging in");
        }


        
    }

  return (
    <div>
        <form onSubmit={handleLogin} className={styles.formbox} >
            <label htmlFor="">Email</label>
            <input type="email" value={loginData.email} name='email' onChange={handleInput} placeholder='Email...' />
            <label>password</label>
            <input type="password" value={loginData.password} name="password" onChange={handleInput} placeholder='password...' />
            <input type="submit" />
        </form>
    </div>
  )
}

export default Login