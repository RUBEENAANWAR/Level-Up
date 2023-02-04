import React,{useContext} from "react";
import {GlobalState} from '../../GlobalState'
import Menu from './icon/menu.svg'
import { Link } from "react-router-dom";
import  Logo  from "./icon/logo.png";
import axios from 'axios'
import './header.css'
//import Stack from '@mui/material'


const AdminHeader=()=>{
    const state=useContext(GlobalState)
    const [isLogged,setIsLogged]=state.adminAPI.isLogged
    const [isAdmin,setIsAdmin]=state.adminAPI.isAdmin

    const adminLogout= async()=>{
        await axios.get('/admin/adminLogout')
        localStorage.clear()
        setIsAdmin(false)
        setIsLogged(false)

    }
 
    console.log(state);
    function LoggerRouter(){
        return(
            <>
            {/* <li>ADMIN</li> */}
            <li><Link to="/adminLogin" onClick={adminLogout}>Logout</Link></li>
            </>   
        )
    }

    return (
     <header>
        <div className="menu"><img src={Menu} alt="" width="20"/>
        </div>
        <div className="logo">
                <Link to="/AdminHome">< img src={Logo} alt="" width="60"/></Link>
        </div>

        <ul>
        {isAdmin}
        {
            isLogged ? LoggerRouter():""
        }  
        </ul>  
     </header>  
    )  
}

export default AdminHeader;

