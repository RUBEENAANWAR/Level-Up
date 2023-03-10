import React,{useState} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';
import './userRegister.css';
import swal from 'sweetalert2';

function UserRegister() {
  const [user,setUser]=useState({
    studentId:"", name:"", email:"",password:"",grade:"",mobile:""
  })

  const onChangeInput=e=>{
    const {name,value}=e.target;
    setUser({...user,[name]:value})
  }

  const RegisterSubmit = async(e)=>{
    e.preventDefault()
    try {
      await axios.post('/user/userRegister',{...user})
      localStorage.setItem('studentLogin',true)
      window.location.href='/userLogin';

    } catch (err) {
      console.log(err);
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
        <form onSubmit={RegisterSubmit}>
          <h2>Student Registration</h2>
          <div className="content">
          <div className="input-box">
              <label htmlFor="studentId">Student Id</label>
              <input
                type="text"
                placeholder="Student Id"
                name="studentId"
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
              <label htmlFor="grade">Grade</label>
              <input
                type="number"
                placeholder="Enter grade/class"
                name="grade"
                onChange={onChangeInput}
              />
            </div>

            <div className="input-box">
              <label htmlFor="subjects">Subjects</label>
              <input
                type="subjects"
                placeholder="Subjects"
                name="subjects"
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

export default UserRegister