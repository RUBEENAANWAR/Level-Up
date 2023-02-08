import React,{useContext} from "react";
import {GlobalState} from '../../GlobalState'
import Menu from './icon/menu.svg'
import { Link } from "react-router-dom";
import  Logo  from "./icon/logo.png";
import axios from 'axios'
import './header.css'
//import Stack from '@mui/material'


function AdminHeader() {
    const state = useContext(GlobalState);
    const [isLogged, setIsLogged] = state.adminAPI.isLogged;
    const [isAdmin, setIsAdmin] = state.adminAPI.isAdmin;
    const logoutAdmin = async () => {
      await axios.get("/admin/adminLogout");
      localStorage.clear();
      setIsAdmin(false);
      setIsLogged(false);
    };
    return (
      <header className='adminHeader'>
             <div className="menu">
          <img src={Menu} alt="" width="25" />
        </div>
        <div className="logo">
          <Link to="/adminHome">
            <img src={Logo} alt="" width="70" className="LOGO" />
          </Link>
        </div>
  
        <ul>
       
          {isAdmin && isLogged && (
            <>
              {/* <li style={{color:"#ffff"}}>ADMIN </li> */}
              <li style={{ color: "#ffff" }}>
                <Link to="/adminLogin" onClick={logoutAdmin}>
                  <button className="logout-button">adminLogout</button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </header>
    );
  }
  
export default AdminHeader;

