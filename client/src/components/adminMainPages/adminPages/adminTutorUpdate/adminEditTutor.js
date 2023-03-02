import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { GlobalState } from "../../../../GlobalState"
import Swal from "sweetalert2";
import {useNavigate,useParams} from 'react-router-dom'
import "./adminEditTutor.css";

const initialState = {
  tutorId: "",
  name: "",
  email: "",
  mobile: "",
  qualification: "",
  isApproved:"" ,
  avatar:"",
  subject:""
};

function AdminEditTutor() {
//   const state=useContext(GlobalState)
// console.log("globalstate",state);
// const [isLogged,setIsLogged]=state.adminAPI.isLogged
// const [isAdmin,setIsAdmin]=state.adminAPI.isAdmin
  const [tutor, setTutor] = useState(initialState);
const navigate=useNavigate()
const params=useParams()

let someFunc=async()=>{
  if(params.id){
        let tutors= await axios.get("/admin/allTutorDetails")
        tutors.data.allTutors.map(ttr =>{
          if(ttr.tutorId === params.id ){
          setTutor(ttr)}
        })
      }else{
        setTutor(initialState)
      }
}
useEffect(()=>{
 someFunc()
},[])

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setTutor({ ...tutor, [name]: value });
    //setState({selectedField:""})
  };

  const imageUpload=(e)=>{
    const { name, value } = e.target;
    setTutor({ ...tutor,avatar:e.target.files[0]  });
    //console.log(e.target.files[0]);
  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
     console.log("==",tutor.avatar,"===",tutor.avatar.name);
     const formdata=new FormData()
     formdata.append('avatar',tutor.avatar,tutor.avatar.name)
     formdata.append('name',tutor.name)
     formdata.append('email',tutor.email)
     formdata.append('mobile',tutor.mobile)
     formdata.append('qualification',tutor.qualification)
     formdata.append('isApproved',tutor.isApproved)
     formdata.append('subject',tutor.subject)
     
    try {
      // if(!isAdmin && !isLogged) return Swal.fire({text:"You are not allowed to edit"})
      await axios.put(`/admin/adminTutorUpdate/${tutor.tutorId}`,formdata)
      navigate("/tutorApprovals")
    } catch (err) {
      Swal.fire({
        text:err.response.data.msg
      })  
    }
  }
 
  return (
  
    <div style={{ marginLeft: "225px" }} className="edit_std">

      <h3 style={{color:"black"}}>EDIT TUTOR</h3>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <label htmlFor="name">Name</label>
          <input type="text" value={tutor.name} name="name" id="name" onChange={handleChangeInput} />
        </div>
        <div className="row">
          <label htmlFor="email">Email</label>
          <input type="text" value={tutor.email} name="email" id="email" onChange={handleChangeInput} />
        </div>
        <div className="row">
          <label htmlFor="mobile">Mobile</label>
          <input type="text" value={tutor.mobile} name="mobile" id="mobile"  onChange={handleChangeInput}/>
        </div>
        <div className="row">
          <label htmlFor="subject">Subject</label>
          <input type="subject" value={tutor.subject} name="subject" id="subject"  onChange={handleChangeInput}/>
        </div>
        <div className="row">
          <label htmlFor="qualificaion">Qualificaion</label>
          <input type="text" value={tutor.qualification} name="qualificaion" id="qualificaion" onChange={handleChangeInput}/>
        </div>
        <div className="row">
          <label htmlFor="approve">Access approval</label>
          <select
            id="approve"
            name="isApproved"
            defaultValue={tutor.isApproved}
            onChange={handleChangeInput}
          >
            <option value="true">Approved</option>
            <option value="false">Denied</option>
          </select>
        </div>
        <div className="row">
          <label htmlFor="dob">Upload Image</label>
          <input type="file" className="form-control" name="myFile" onChange={imageUpload}/>
        </div>
         <div>
        <button type="button" style={{backgroundColor:"black"}} className="btn btn-primary" onClick={handleSubmit}>Edit</button>
        </div>
        {/* <div>
        <button type="button" value="true" className="btn btn-primary"  onClick={handleChangeInput} >Approve</button>
        </div> */}
      </form>
      
    </div>
  );
}

export default AdminEditTutor;