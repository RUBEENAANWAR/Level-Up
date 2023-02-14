import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { GlobalState } from "../../../../GlobalState"
import Swal from "sweetalert2";
import {useNavigate,useParams} from 'react-router-dom'
import "./adminEditUser.css";

const initialState = {
  studentId: "",
  name: "",
  email: "",
  mobile: "",
  grade: "",
  isApproved:"" ,
  avatar:"" 
};

function AdminEditUser() {
//   const state=useContext(GlobalState)
// console.log("globalstate",state);
// const [isLogged,setIsLogged]=state.adminAPI.isLogged
// const [isAdmin,setIsAdmin]=state.adminAPI.isAdmin
  const [user, setUser] = useState(initialState);
const navigate=useNavigate()
const params=useParams()

let someFunc=async()=>{
  if(params.id){
        let users= await axios.get("/admin/allUserDetails")
        users.data.allUsers.map(usr =>{
          if(usr.studentId === params.id ){
          setUser(usr)}
        })
      }else{
        setUser(initialState)
      }
}
useEffect(()=>{
 someFunc()
},[])

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    //setState({selectedField:""})
  };

  const imageUpload=(e)=>{
    const { name, value } = e.target;
    setUser({ ...user,avatar:e.target.files[0]  });
    //console.log(e.target.files[0]);
  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
     console.log("==",user.avatar,"===",user.avatar.name);
     const formdata=new FormData()
     formdata.append('avatar',user.avatar,user.avatar.name)
     formdata.append('name',user.name)
     formdata.append('email',user.email)
     formdata.append('mobile',user.mobile)
     formdata.append('grade',user.grade)
     formdata.append('isApproved',user.isApproved)

    try {
      // if(!isAdmin && !isLogged) return Swal.fire({text:"You are not allowed to edit"})
      await axios.put(`/admin/adminUserUpdate/${user.studentId}`,formdata)
      navigate("/userApprovals")
    } catch (err) {
      Swal.fire({
        text:err.response.data.msg
      })  
    }
  }
 
  return (
  
    <div style={{ marginLeft: "225px" }} className="edit_std">

      <h3 style={{color:"black"}}>EDIT STUDENT</h3>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" onChange={handleChangeInput} />
        </div>
        <div className="row">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" onChange={handleChangeInput} />
        </div>
        <div className="row">
          <label htmlFor="mobile">Mobile</label>
          <input type="text" name="mobile" id="mobile"  onChange={handleChangeInput}/>
        </div>
        {/* <div className="row">
          <label htmlFor="dob">Date of Birth</label>
          <input type="text" name="dob" id="dob" onChange={handleChangeInput}/>
        </div> */}
        {/* <div className="row">
          <label htmlFor="bloodGroup">Blood Group</label>
          <input type="text" name="bloodGroup" id="bloodGroup" onChange={handleChangeInput}/>
        </div> */}
        <div className="row">
          <label htmlFor="grade">Class</label>
          <input type="text" name="grade" id="grade" onChange={handleChangeInput}/>
        </div>
        <div className="row">
        <select>
       <option value="true">True</option>
      <option value="false">False</option> 
      </select>
          <input type="text" name="address" id="status" onChange={handleChangeInput}/>
        </div>
        <div className="row">
          <label htmlFor="dob">Upload Image</label>
          <input type="file" className="form-control" name="myFile" onChange={imageUpload}/>
        </div>
         <div>
        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Edit</button>
        </div>
        <div>
        <button type="button" value="true" className="btn btn-primary"  onClick={handleChangeInput} >Approve</button>
        </div>
      </form>
      
    </div>
  );
}

export default AdminEditUser;