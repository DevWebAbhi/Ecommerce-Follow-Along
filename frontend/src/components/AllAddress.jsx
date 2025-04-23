import React,{useEffect, useState} from 'react'
import axios from "axios";
const AllAddress = () => {
    const [address,setAddress] = useState([]);
    
    async function getAddress(){
        try {
            const userData = JSON.parse(localStorage.getItem("follow-along-auth-token-user-name-id"))
            const address = await axios.get("http://localhost:8080/address",
                {headers: { 
                    "Authorization": userData.token 
                }}
            );
            setAddress(address.data.addresses);
            console.log(address);
            alert("data fetched sucessfully");
        } catch (error) {
            console.log(error);
            alert("something went wrong");

        }
    }
    useEffect(()=>{
        getAddress();
    },[])
  return (
    <div>{
        address.map((ele,idx)=>{
            return <div key={ele._id}>
                <h1
                style={{fontSize:"2rem"}}
                >{`Address ${idx+1}`}</h1>
                <h3>{ele.country}</h3>
                <h4>{ele.city}</h4>
                <p>{ele.address1}</p>
                <p>{ele.address2}</p>
                <p>{ele.zipCode}</p>
            </div>
        })
        }</div>
  )
}

export default AllAddress