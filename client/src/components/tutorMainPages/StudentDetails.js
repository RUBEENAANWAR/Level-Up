import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./StudentDetails.css";
import { GlobalState } from "../../GlobalState";
import NotFound from "../adminMainPages/utils/not_found/NotFound";

//import DataTable from 'react-data-table-component';

const StudentDetails = () => {
  const state = useContext(GlobalState);
  const [allUsers, setAllUsers] = useState([]);
  const [isTutorLogged, setIsTutorLogged] = state.tutorAPI.isTutorLogged;
  const [isTutor, setIsTutor] = state.tutorAPI.isTutor;
  const [tutorDetails, setTutorDetails] = useState({});

  const getAllUsers = async (e) => {
    try {
      console.log(8787);
      const res = await axios.get("/tutor/refresh_token");
      console.log("allUsers", res.data.userDetails);
      setAllUsers(res.data.userDetails);
      setTutorDetails(res.data.tutorDetails);
    } catch (err) {
      console.log(err);
      //   Swal.fire({
      //     text: err.response.data.msg,
      //   });
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  console.log(allUsers);

  return (
    <div className="table-container">
      {/* <h3>Class Teacher:{tchrDetails.name}</h3> */}

      <h1 className="stdHeading">Subject:{tutorDetails.subject}</h1>
      <table className="user-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Ad.No</th>

            <th>Name</th>

            <th>Email</th>
            <th>Mobile</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user) => (
            <tr key={user._id}>
              <img
                src={`http://localhost:3000/public/images/${user.avatar}`}
                alt={user.name}
              />
              <td>{user.studentId}</td>

              <td>{user.name}</td>

              <td>{user.email}</td>
              <td>{user.mobile}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    // <div style={{ marginLeft: "250px" }}>

    //   <div className="students">
    //     {allUsers.map((users) => {
    //       return (
    //         <div className="student_card" key={users._id}>
    //           <img src={`http://localhost:3000/public/images/${users.avatar}`} alt="" />
    //           <div className="student_box">
    //             <h2 title={users.name} style={{ color: "black" }}>
    //               {users.name}
    //             </h2>
    //             <p>Id: {users.studentId}</p>
    //             <p>Grade: {users.grade}</p>
    //             <p>Email: {users.email}</p>
    //             <p>Mobile: {users.mobile}</p>

    //             <div className="row_btn">
    //               <button style={{ background: "#cf1928" }} >Edit</button>

    //             </div>
    //           </div>
    //         </div>
    //       );
    //     })}
    //   </div>
    // </div>
  );
};

export default StudentDetails;
