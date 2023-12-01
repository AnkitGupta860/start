import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Nav = () => {

    const navigate = useNavigate('');

    const auth = localStorage.getItem('user');
    
    const logoutHandler = () => {
        localStorage.clear();
        navigate("/login");
    }

    return (
            
        <div>
            { auth ?
            <ul className="nav-ul">
                <li><Link to="/" >Home</Link></li>
                <li><Link to="/addProduct">Add Product</Link></li>
                <li><Link to="/update">Update</Link></li>
                <li><Link to="/favourite">Favorites</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/cart">Cart</Link></li>
                <li><Link to="/login" onClick={logoutHandler}>Logout</Link></li>
            </ul> :
            <ul className="nav-ul nav-right">
                <li><Link to="/login">login</Link></li>
                <li><Link to="/registration">Registration</Link></li>
            </ul>
        }
        </div>
            
    )
}

export default Nav;