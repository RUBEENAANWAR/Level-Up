import React, { useState, useContext, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";
import NotFound from "../utils/not_found/NotFound";
import swal from "sweetalert2";
//import ProfPic from "../../headers/icon/profpic.png";
import "./TutorProfile.css";

const TutorProfile = () => {
  const state = useContext(GlobalState);

  const [isTutorLogged, setIsTutorLogged] = state.tutorAPI.isTutorLogged;
  const [isTutor, setIsTutor] = state.tutorAPI.isTutor;
  const [tutorDetails, setTutorDetails] = useState({});

  function LoggedRouter() {
    const GetTutor = async () => {
      try {
        const res = await axios.get("/tutor/refresh_token");
        console.log("resDetails", res.data.tutorDetails);
        setTutorDetails(res.data.tutorDetails);
      } catch (err) {
        console.log("error msg", err.response.data.msg);
        swal.fire(err.response.data.msg);
      }
    };
    useEffect(() => {
      GetTutor();
    }, []);

    return (
      <div className="main">
        <div className="container emp">
          <div className="profile-container">
            <img src={tutorDetails.avatar} alt="" />

            <h1>
              <i>{tutorDetails.name}</i>
            </h1>
            <h3>({tutorDetails.role})</h3>

            <p>{tutorDetails.email}</p>
            <p>{tutorDetails.mobile}</p>
          </div>
        </div>
        <button className="Button-style">Change Profile Pic</button>
      </div>
    );
  }

  return (
    <>
      {isTutor && isTutorLogged ? LoggedRouter() : NotFound()}
    </>
  );
};

export default TutorProfile;
