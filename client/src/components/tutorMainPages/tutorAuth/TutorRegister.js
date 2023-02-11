import React,{useState} from 'react';
//import {Link} from 'react-router-dom'
import axios from 'axios';
import './TutorRegister.css';
import swal from 'sweetalert2';

function TutorRegister() {
  const [tutor,setTutor]=useState({
    tutorId:"", name:"", email:"",password:"",qualification:"",mobile:""
  })

  const onChangeInput=e=>{
    const {name,value}=e.target;
    setTutor({...tutor,[name]:value})
  }

  const registerSubmit=async e=>{
    e.preventDefault()
    try {
      await axios.post('tutor/tutorRegister',{...tutor})
      localStorage.setItem('tutorLogin',true)
      window.location.href='/tutorLogin';

    } catch (err) {
      swal.fire({
        text: err.response.data.msg,
        icon: "warning",
        confirmButtonColor:"#b8121b"
      });
      //alert(err.response.data.msg)
      //console.log(req.cookies);
      
    }
  }   

  return (
    <div className="main-container">
      <div className="Container" style={{ marginLeft: "220px" }}>
        <form onSubmit={registerSubmit}>
          <h2>Tutor Registration</h2>
          <div className="content">
          <div className="input-box">
              <label htmlFor="tutorId">Tutor Id</label>
              <input
                type="text"
                placeholder="Tutor Id"
                name="tutorId"
                onChange={onChangeInput}
              />
            </div>
            <div className="input-box">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                placeholder="Enter full name"
                name="name"
                onChange={onChangeInput}
              />
            </div>

            <div className="input-box">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={onChangeInput}
              />
            </div>

            <div className="input-box">
              <label htmlFor="mobile">Mobile</label>
              <input
                type="tel"
                placeholder="Enter mobile number"
                name="mobile"
                onChange={onChangeInput}
              />
            </div>

            <div className="input-box">
              <label htmlFor="name">Qualification</label>
              <input
                type="text"
                placeholder="Enter Qualification"
                name="Qualification"
                onChange={onChangeInput}
              />
            </div>

            <div className="input-box">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                name="password"
                onChange={onChangeInput}
              />
            </div>
          </div>
          <div className="button-container">
            <button type="submit">Register</button>
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default TutorRegister