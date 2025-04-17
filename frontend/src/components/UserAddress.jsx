import React, { useState } from 'react'

const UserAddress = () => {
    const [address,setAddress] = useState({
        country:"",
        city:"",
        address1:"",
        address2:"",
        zipCode:""
    });

    function handleAddressForm(event){
        event.preventDefault();
        console.log(address);
    }
  return (
    <div>
        <form action=""
        onSubmit={handleAddressForm}
        style={{
            display:"flex",
            flexDirection:"column",
            width:"max-content",
            margin:"auto"
        }}
        >
            <label htmlFor="">Select Country
                <select name="country" id="" 
                    onChange={(event)=>{
                        setAddress({...address,[event.target.name]:event.target.value})
                    }}
                    value={address.country}
                >
                    <option value="India">India</option>
                    <option value="China">China</option>
                    <option value="Afganstan">Afganstan</option>
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="Russia">Russia</option>
                    <option value="USA">USA</option>
                </select>
            </label>
            <label htmlFor="">
                CITY
                <select name="city" id=""
                onChange={(event)=>{
                    setAddress({...address,[event.target.name]:event.target.value})
                }}
                value={address.city}
                >
                    <option value="Rajamahendravaram">Rajamahendravaram</option>
                    <option value="Patna">Patna</option>
                    <option value="Katni">Katni</option>
                    <option value="Hajipur">Hajipur</option>
                    <option value="Delhi">Delhi</option>
                </select>
            </label>
            <label htmlFor="">
                Address 1
                <textarea name="address1" id=""
                onChange={(event)=>{
                    setAddress({...address,[event.target.name]:event.target.value})
                }}
                value={address.address1}
                >Add Address 1</textarea>
            </label>
            <label htmlFor="">
                Address 2
                <textarea name="address2" id=""
                value={address.address2}
                onChange={(event)=>{
                    setAddress({...address,[event.target.name]:event.target.value})
                }}
                >Add Address 2</textarea>
            </label>
            <label htmlFor="">
                ZIP Code
                <input type="number" name='zipCode'
                onChange={(event)=>{
                    setAddress({...address,[event.target.name]:event.target.value})
                }}
                value={address.zipCode}
                />
            </label>
            <input type="submit" />
        </form>
    </div>
  )
}

export default UserAddress