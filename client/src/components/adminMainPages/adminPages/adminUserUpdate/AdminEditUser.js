import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { GlobalState } from "../../../../GlobalState";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import "./adminEditUser.css";
import { margin } from "@mui/system";

const initialState = {
  studentId: "",
  name: "",
  email: "",
  mobile: "",
  grade: "",
  isApproved: "",
  avatar: "",
  subject: "",
};

function AdminEditUser() {
  //   const state=useContext(GlobalState)
  // console.log("globalstate",state);
  // const [isLogged,setIsLogged]=state.adminAPI.isLogged
  // const [isAdmin,setIsAdmin]=state.adminAPI.isAdmin
  const [user, setUser] = useState(initialState);
  const navigate = useNavigate();
  const params = useParams();
  const [approved, setApproved] = useState();

  let someFunc = async () => {
    if (params.id) {
      let users = await axios.get("/admin/allUserDetails");
      users.data.allUsers.map((usr) => {
        if (usr.studentId === params.id) {
          setUser(usr);
        }
      });
    } else {
      setUser(initialState);
    }
  };
  useEffect(() => {
    someFunc();
  }, []);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    //setState({selectedField:""})
  };

  const imageUpload = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, avatar: e.target.files[0] });
    //console.log(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("==", user.avatar, "===", user.avatar.name);
    const formdata = new FormData();
    formdata.append("avatar", user.avatar, user.avatar.name);
    formdata.append("name", user.name);
    formdata.append("email", user.email);
    formdata.append("mobile", user.mobile);
    formdata.append("grade", user.grade);
    formdata.append("isApproved", user.isApproved);
    formdata.append("subject", user.subject);

    try {
      // if(!isAdmin && !isLogged) return Swal.fire({text:"You are not allowed to edit"})
      await axios.put(`/admin/adminUserUpdate/${user.studentId}`, formdata);
      navigate("/userApprovals");
    } catch (err) {
      Swal.fire({
        text: err.response.data.msg,
      });
    }
  };

  return (
    <div className="edit_std">
      <form onSubmit={handleSubmit}>
        <h3 style={{ color: "black", marginBottom: "30px" }}>EDIT STUDENT</h3>

        <div className="row">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            value={user.name}
            name="name"
            id="name"
            onChange={handleChangeInput}
          />
        </div>
        <div className="row">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            value={user.email}
            name="email"
            id="email"
            onChange={handleChangeInput}
          />
        </div>
        <div className="row">
          <label htmlFor="mobile">Mobile</label>
          <input
            type="text"
            value={user.mobile}
            name="mobile"
            id="mobile"
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="subject">Subject</label>
          <input
            type="subject"
            name="subject"
            id="subject"
            onChange={handleChangeInput}
          />
        </div>
        <div className="row">
          <label htmlFor="grade">Class</label>
          <input
            type="text"
            value={user.grade}
            name="grade"
            id="grade"
            onChange={handleChangeInput}
          />
        </div>
        <div className="row">
          <label htmlFor="approve">Access approval</label>
          <select id="approve" name="approve">
            <option value="true" onChange={handleChangeInput}>
              Approved
            </option>
            <option value="false" onChange={handleChangeInput}>
              Denied
            </option>
          </select>
        </div>
        <div className="row">
          <label htmlFor="dob">Upload Image</label>
          <input
            type="file"
            className="form-control"
            name="myFile"
            onChange={imageUpload}
          />
        </div>
        <div>
          <button type="button" style={{backgroundColor:"black"}} onClick={handleSubmit}>
            Edit
          </button>
        </div>
        {/* <div>
        <button type="button" value="true" className="btn btn-primary"  onClick={handleChangeInput} >Approve</button>
        </div>  */}
      </form>
    </div>
  );
}

export default AdminEditUser;
