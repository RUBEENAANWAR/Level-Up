import React, { useState, useContext, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";
import NotFound from "../utils/not_found/NotFound";
import swal from "sweetalert2";
//import ProfPic from "../../headers/icon/profpic.png";
import "./adminprof.css";

const AdminProfile = () => {
  const state = useContext(GlobalState);

  const [isLogged, setIsLogged] = state.adminAPI.isLogged;
  const [isAdmin, setIsAdmin] = state.adminAPI.isAdmin;
  const [adminDetails, setAdminDetails] = useState({});

  function LoggedRouter() {
    const GetAdmin = async () => {
      try {
        const res = await axios.get("/admin/refresh_token");
        console.log("resDetails", res.data.adminDetails);
        setAdminDetails(res.data.adminDetails);
      } catch (err) {
        console.log("error msg", err.response.data.msg);
        swal.fire(err.response.data.msg);
      }
    };
    useEffect(() => {
      GetAdmin();
    }, []);

    return (
      <div className="main">
        <div className="container emp">
          <div className="profile-container">
            <img src={adminDetails.avatar} alt="" />

            <h1>
              <i>{adminDetails.name}</i>
            </h1>
            <h3>({adminDetails.role})</h3>

            <p>{adminDetails.email}</p>
            <p>{adminDetails.mobile}</p>
          </div>
        </div>
        {/* <button className="Button-style">Change Profile Pic</button> */}
      </div>
    );
  }

  return (
    <>
      {isAdmin && isLogged ? LoggedRouter() : NotFound()}
    </>
  );
};

export default AdminProfile;
