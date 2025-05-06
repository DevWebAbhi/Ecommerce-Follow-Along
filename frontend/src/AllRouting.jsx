import React from 'react'
import {Route,Routes} from "react-router-dom";
import Products from './components/Products';
import Login from './components/Login';
import Signup from './components/Signup';
import AddProduct from './components/AddProduct';
import MyProducts from './components/MyProducts';
import Cart from "./components/Cart"
import User from './components/User';
import UserAddress from './components/UserAddress';
import AllAddress from './components/AllAddress';
import Checkout from './components/Checkout';
import MyOrders from './components/MyOrders';
const AllRouting = () => {
  return (
    <Routes>
        <Route path='/' element={<Products/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/addproducts' element={<AddProduct/>}/>
        <Route path='/myproducts' element={<MyProducts/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/user' element={<User/>}/>
        <Route path='/user-address' element={<UserAddress/>}/>
        <Route path='/all-address' element={<AllAddress/>} />
        <Route path='/checkout' element={<Checkout/>} />
        <Route path='/myorders' element={<MyOrders/>} />
        <Route path='*' element={<h1>404 Not Found</h1>} />
        
    </Routes>
  )
}

export default AllRouting