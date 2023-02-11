import React, { useState, useContext, useEffect } from "react";
import { GlobalState } from "../../GlobalState";
import axios from "axios";
import NotFound from "../adminMainPages/utils/not_found/NotFound";
import swal from "sweetalert2";
//import ProfPic from "../../headers/icon/profpic.png";
import "./UserProfile.css";

const UserProfile = () => {
  const state = useContext(GlobalState);

  const [isUserLogged, setIsUserLogged] = state.userAPI.isUserLogged;
  const [isUser, setIsUser] = state.userAPI.isUser;
  const [userDetails, setUserDetails] = useState({});

  function LoggedRouter() {
    const GetUser = async () => {
      try {
        const res = await axios.get("/user/refresh_token");
        console.log("resDetails", res.data.userDetails);
        setUserDetails(res.data.userDetails);
      } catch (err) {
        console.log("error msg", err.response.data.msg);
        swal.fire(err.response.data.msg);
      }
    };
    useEffect(() => {
      GetUser();
    }, []);

    return (
      <div className="main">
        <div className="container emp">
          <div className="profile-container">
            <img src={userDetails.avatar} alt="" />

            <h1>
              <i>{userDetails.name}</i>
            </h1>
            <h3>({userDetails.role})</h3>

            <p>{userDetails.email}</p>
            <p>{userDetails.mobile}</p>
          </div>
        </div>
        <button className="Button-style">Change Profile Pic</button>
      </div>
    );
  }

  return (
    <>
      {isUser && isUserLogged ? LoggedRouter() : NotFound()}
    </>
  );
};

export default UserProfile;
