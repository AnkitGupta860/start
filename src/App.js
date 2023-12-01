// App.js
import React, { useState } from 'react';
import { useNavigate, Route, Routes, BrowserRouter } from 'react-router-dom';
import Registration from './Component/Registration';
import './App.css';
import Home from './Component/Home';
import Login from './Component/Login';
import AddProduct from './Component/AddProduct';
import UpdateProduct from './Component/UpdateProduct';
import Favorite from './Component/Favourite';
import Profile from './Component/Profile';
import Nav from './Component/Nav'; 
import AddToCart from './Component/AddToCart';


function App() {



  return (
    <div>
      <BrowserRouter>
      <Nav/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Registration" element={<Registration />}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/addProduct' element={ <AddProduct/>}/>
          <Route path='/updateProduct' element={ <UpdateProduct/>}/>
          <Route path='/favourite' element={ <Favorite/>}/>
          <Route path='/profile' element={ <Profile/>}/>
          <Route path='/cart' element={ <AddToCart/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
