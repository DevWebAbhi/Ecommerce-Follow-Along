import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Payment = () => {
    const [totalAmount,setTotalAmount] = useState(0);
    const navigate = useLocation();

    useEffect(()=>{
      if(navigate.state && navigate.state.payment){
        setTotalAmount(navigate.state.payment);
      } 
    })
  return (
    <div>
        <h1
        style={{
            textAlign: "center",
            marginTop: "200px",
            color:"lightblue"
        }}
        >Payment Sucessfull for {totalAmount} Rupees</h1>
    </div>
  )
}

export default Payment