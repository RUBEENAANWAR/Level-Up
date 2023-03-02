import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./UserApproval.css"
//import DataTable from 'react-data-table-component';

function UserApproval() {
  const [allUsers, setAllUsers] = useState([]);
  const [imagePath,setPath]=useState('')

  const getAllUsers = async () => {
    try {
      const res = await axios.get("/admin/allUserDetails");
      console.log("allUsers", res.data.allUsers);
      setAllUsers(res.data.allUsers);
      setPath(process.env.REACT_APP_IMAGE_PATH)
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
    <div>
      <div className="students">
        {allUsers.map((user) => {
          return (
            <div className="student_card" style={{height:"500px"}} key={user._id}>
              <img src={`http://localhost:3000/public/images/${user.avatar}`} alt="" />
              <div className="student_box">
                <h2 title={user.name} style={{ color: "black" }}>
                  {user.name}
                </h2>
                <p>Id: {user.studentId}</p>
                <p>Grade: {user.grade}</p>
                <p>Email: {user.email}</p>
                <p>Mobile: {user.mobile}</p>
                <p>Subject: {user.subject}</p>
                <p>Status:{user.isApproved.toString()}</p>

                <div className="row_btn">
                <a href={`/adminEditUser/${user.studentId}`} style={{color:"blue"}}>EDIT</a>
                  

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
