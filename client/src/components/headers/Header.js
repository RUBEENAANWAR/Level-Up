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
        <img src={Menu} width="25" />
      </div>
      <div className="logo">
        <Link to="/adminHome">
          <img src={Logo} width="70" className="LOGO" />
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


function UserHeader() {
  const state = useContext(GlobalState);
  const [isUserLogged, setIsUserLogged] = state.userAPI.isUserLogged;
  const [isUser, setIsUser] = state.userAPI.isUser;
  const logoutUser = async () => {
    await axios.get("/user/userLogout");
    localStorage.clear();
    setIsUser(false);
    setIsUserLogged(false);
  };
  return (
    <header className='stdHeader'>
           <div className="stdmenu">
        <img src={Menu} width="25" />
      </div>
      <div className="stdlogo">
      {/* <Link to="/userProfile">
          <p>Profile</p>
        </Link> */}
        <Link to="/studentHome">
          <img src={Logo} width="70" className="stdLOGO" />
        </Link>
      </div>

      <ul className='stdul'>
     
        {isUser && isUserLogged && (
          <>
            {/* <li style={{color:"#ffff"}}>ADMIN </li> */}
            <li style={{ color: "#ffff" }}>
              <Link to="/userLogin" onClick={logoutUser}>
                <button className="stdlogout-button">userLogout</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

function TutorHeader() {
  const state = useContext(GlobalState);
  const [isTutorLogged, setIsTutorLogged] = state.tutorAPI.isTutorLogged;
  const [isTutor, setIsTutor] = state.tutorAPI.isTutor;
  const logoutTutor = async () => {
    await axios.get("/tutor/tutorLogout");
    localStorage.clear();
    setIsTutor(false);
    setIsTutorLogged(false);
  };
  return (
    <header className='tchrHeader'>
           <div className="tchrmenu">
        <img src={Menu} width="25" />
      </div>
      <div className="tchrlogo">
        <Link to="/teacherHome">
          <img src={Logo} width="80" className="tchrLOGO" />
        </Link>
      </div>

      <ul className='tchrul'>
     
        {isTutor && isTutorLogged && (
          <>
            {/* <li style={{color:"#ffff"}}>ADMIN </li> */}
            <li style={{ color: "#ffff", }}>
              <Link to="/tutorProfile">
              <p className='tchrprofile'>Profile</p>
              </Link>
             
              <Link to="/tutorLogin" onClick={logoutTutor}>
                <button className="tchrlogout-button">TutorLogout</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

function NormalHeader(){
  return(
    <header className='normalHeader'>
    <div className="normalmenu">
 {/* <img src={Menu} width="25" /> */}
</div>
<div className="normallogo">
 <Link to="/">
   <img src={Logo} width="90" className="normalLOGO" />
 </Link>
</div>
</header>
  )
}
function Header() {

  const state = useContext(GlobalState);
  // console.log("globalstate",state);
  const [isUser, setIsUser] = state.userAPI.isUser;
  const [isAdmin,setIsAdmin]=state.adminAPI.isAdmin
  const [isTutor,setIsTutor]=state.tutorAPI.isTutor

  return (
    <div>
      {isUser?<UserHeader/> :
      isAdmin?<AdminHeader/>:
      isTutor?<TutorHeader/>:<NormalHeader/>  }
    </div>
  )
}

export default Header
  


