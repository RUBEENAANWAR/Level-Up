import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { GlobalState } from "../../../GlobalState";
import NotFound from "../../../components/adminMainPages/utils/not_found/NotFound"
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import "./TutorProfile.css"

function TutorProfile() {
    const state = useContext(GlobalState);
    const [isTutorLogged, setIsTutorLogged] = state.tutorAPI.isTutorLogged;
    const [isTutor, setIsTutor] = state.tutorAPI.isTutor;
    const [tutorDetails, setTutorDetails] = useState({});

    const GetTutor = async (e) => {
      try {
        const res = await axios.get("/tutor/refresh_token");
        console.log(res.data.tutorDetails);
        // console.log("set", setAdminDetails(res.data.adminDetails));
        setTutorDetails(res.data.tutorDetails);
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
      GetTutor();
    }, []);
    function LoggedRouter() {
  return (
    <div class="tutor-biodata">
        <div class="tutor-picture">
      <img src={`http://localhost:3000/public/images/${tutorDetails.avatar}`} alt="tutor"/>
    </div>
    <div class="tutor-info">
      <h2>Tutor Information</h2>
      <p>Name: {tutorDetails.name}</p>
      <p>Qualification:{tutorDetails.qualification}</p>
      <p>Email:{tutorDetails.email}</p>
      <p>Mobile:{tutorDetails.mobile}</p>

     
    </div>
    
  </div>
  
  )
}
return (
    <>
    
      {isTutor && isTutorLogged ? LoggedRouter() : NotFound()}

    </>
  );
}

export default TutorProfile