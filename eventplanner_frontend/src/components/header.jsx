import React from 'react';
import './header.css'

import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axiosInstance from '../axios';

const Header = () => {
    const onLoginPage = window.location.pathname == '/login';
    const [name, setName] = useState([]);

    useEffect(() => {     
        if(!onLoginPage){
            axiosInstance.get('users/me/')
            .then(response => {
                const data = response.data;
                setName(data.user_name);
            })
            .catch(err => console.log(err))
        }
      }, []);

    return (
        <div className="navbar">
            <div className="tag">
                <div className="luxury">
                    <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" />
                        <Link to="/">
                            <div>
                                <h3 style={{color:'white'}}>Movie Nights</h3>
                                <i style={{color:'white'}}>Plan with your friends</i>
                            </div>
                        </Link>
                </div>
            </div>
            <div className="navbar-user-display">
            {onLoginPage ? 
                <div>
                    Please Login
                </div>
                :
                <div> 
                    Welcome {name}
                </div>}
            </div>
      </div>
    );
};

export default Header;