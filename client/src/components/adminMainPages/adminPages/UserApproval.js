import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./UserApproval.css"
//import DataTable from 'react-data-table-component';

function UserApproval() {
  const [allUsers, setAllUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const res = await axios.get("/admin/allUserDetails");
      console.log("allUsesr", res.data.allUsers);
      setAllUsers(res.data.allUsers);
    } catch (err) {
      Swal.fire({
        text: err.response.data.msg,
      });
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div style={{ marginLeft: "250px" }}>

      <div className="students">
        {allUsers.map((users) => {
          return (
            <div className="student_card" key={users._id}>
              <img src={users.avatar} alt="" />
              <div className="student_box">
                <h2 title={users.name} style={{ color: "black" }}>
                  {users.name}
                </h2>
                <p>Id: {users.studentId}</p>
                <p>Grade: {users.grade}</p>
                <p>Email: {users.email}</p>
                <p>Mobile: {users.mobile}</p>
                <p>Status:{users.isApproved.toString()}</p>

                <div className="row_btn">
                <a href={`/adminEditUser/${users.studentId}`} style={{color:"blue"}}>EDIT</a>
                  

                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UserApproval;
