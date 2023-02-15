import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { GlobalState } from "../../../GlobalState";
import NotFound from "../../../components/adminMainPages/utils/not_found/NotFound"
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import "./UserProfile.css"

function UserProfile() {
    const state = useContext(GlobalState);
    const [isUserLogged, setIsUserLogged] = state.userAPI.isUserLogged;
    const [isUser, setIsUser] = state.userAPI.isUser;
    const [userDetails, setUserDetails] = useState({});


    const GetUser = async (e) => {
      try {
        const res = await axios.get("/user/refresh_token");
        console.log(res.data.userDetails);
        // console.log("set", setAdminDetails(res.data.adminDetails));
        setUserDetails(res.data.userDetails);
      } catch (err) {
        console.log(err.response.data.msg, "error");

        // Swal.fire({
        //   text: err.response.data.msg,
        //   confirmButtonColor: "#b8121b",
        // });
      }
    };
    useEffect(() => {
     async function hi() {

      }
      GetUser();
    }, []);
    function LoggedRouter() {
  return (
    <div class="student-biodata">
        <div class="student-picture">
      <img src={`http://localhost:3000/public/images/${userDetails.avatar}`} alt="Student"/>
    </div>
    <div class="student-info">
      <h2>Student Information</h2>
      <p>Name: {userDetails.name}</p>
      <p>Class:{userDetails.grade}</p>
      <p>Email:{userDetails.email}</p>
      <p>Mobile:{userDetails.mobile}</p>
     
    </div>
    
  </div>
  
  )
}
return (
    <>
    
      {isUser && isUserLogged ? LoggedRouter() : NotFound()}

    </>
  );
}

export default UserProfile