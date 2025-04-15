import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
const userData = JSON.parse(localStorage.getItem("follow-along-auth-token-user-name-id")) || [];
        console.log(userData)
const User = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(()=>{

        console.log(searchParams);
    },[])

  return (
    <div style={
        {width:"max-content",margin:"auto"}
    }>
        <img src={userData.userImage} alt="image" style={
            {
                borderRadius:"50%"
            }
        } />
        <h3
        style={
            {
                textAlign:"center",
                marginTop:"1rem"
            }
        }
        >{userData.name}</h3>
    </div>
  )
}

export default User