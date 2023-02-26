import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./TutorApproval.css"
//import DataTable from 'react-data-table-component';

function TutorApproval() {
  const [allTutors, setAllTutors] = useState([]);
  const [imagePath,setPath]=useState('')

  const getAllTutors = async () => {
    try {
      const res = await axios.get("/admin/allTutorDetails");
      console.log("alltutors", res.data.allTutors);
      setAllTutors(res.data.allTutors);
      setPath(process.env.REACT_APP_IMAGE_PATH)

    } catch (err) {
      Swal.fire({
        text: err.response.data.msg,
      });
    }
  };

  useEffect(() => {
    getAllTutors();
  }, []);

  return (
    <div style={{ marginLeft: "250px" }}>

      <div className="tutors">
        {allTutors.map((tutor) => {
          return (
            <div className="tutors_card" key={tutor._id}>
              <img src={`http://localhost:3000/public/images/${tutor.avatar}`} alt="" />
              <div className="tutor_box">
                <h2 title={tutor.name} style={{ color: "black" }}>
                  {tutor.name}
                </h2>
                <p>Id: {tutor.tutorId}</p>
                <p>Grade: {tutor.grade}</p>
                <p>Email: {tutor.email}</p>
                <p>Mobile: {tutor.mobile}</p>
                <p>Status:{tutor.isApproved}</p>
                <p>Subject: {tutor.subject}</p>

                <div className="row_btn">
                <a href={`/adminEditTutor/${tutor.tutorId}`} style={{color:"blue"}}>EDIT</a>


                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TutorApproval;
