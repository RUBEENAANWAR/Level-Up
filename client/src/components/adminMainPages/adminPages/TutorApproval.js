import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./TutorApproval.css"
//import DataTable from 'react-data-table-component';

function TutorApproval() {
  const [allTutors, setAllTutors] = useState([]);

  const getAllTutors = async () => {
    try {
      const res = await axios.get("/admin/allTutorDetails");
      console.log("alltutors", res.data.allTutors);
      setAllTutors(res.data.allTutors);
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

      <div className="students">
        {allTutors.map((tutors) => {
          return (
            <div className="student_card" key={tutors._id}>
              <img src={tutors.avatar} alt="" />
              <div className="student_box">
                <h2 title={tutors.name} style={{ color: "black" }}>
                  {tutors.name}
                </h2>
                <p>Id: {tutors.tutorId}</p>
                <p>Grade: {tutors.grade}</p>
                <p>Email: {tutors.email}</p>
                <p>Mobile: {tutors.mobile}</p>
                <p>Status:{tutors.isApproved}</p>

                <div className="row_btn">
                  <button style={{ background: "#cf1928" }}>Pending</button>
                  <button style={{ background: "#243f8a" }}>Approved</button>

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
