import React,{useState,useContext} from "react";
import {GlobalState} from '../../GlobalState'
import Menu from './icon/menu.svg'
import { Link } from "react-router-dom";
import  Logo  from "./icon/logo.png";


function Header(){
    const value=useContext(GlobalState)
    return (
     <header>
        <div className="menu">
           <img src={Menu} alt="" width="20"/>
        </div>

        <div className="logo">
            <h1>
                <Link to="/">Levelup</Link>
            </h1>
        </div>
        <ul className="links">
            <li><Link to='/adminLogin'>Login</Link></li>
            <li><Link to='/adminLogout'>Logout</Link></li>
            <li>
                <img src={ Logo } alt='' width="70"/>
            </li>

        </ul>
         
     </header>
    )
}

export default Header;