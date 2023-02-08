import React,{useState} from 'react';
import axios from 'axios'
import './userLogin.css';
import swal from 'sweetalert2';

function UserLogin() {
  const [user,setUser]=useState({
    email:"",password:""
  })

  const onChangeInput=e=>{
    const {name,value}=e.target;
    setUser({...user,[name]:value})
  }

  const loginSubmit=async e=>{
    e.preventDefault()
    try {
      await axios.post('/user/userLogin',{...user})
      localStorage.setItem('studentLogin',true)
      window.location.href='/userHome';

    } catch (err) {
         swal.fire(err.response.data.msg);

         //alert(err.response.data.msg)
      //console.log(req.cookies);
      
    }
  }

  return (
    <div className="main-container">
      <div className="Container" style={{ marginLeft: "220px" }}>
        <form onSubmit={loginSubmit}>
          <h2>Student Login</h2>
          <div className="content">
            <div className="input-box">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={onChangeInput}
                value={user.email}
              />
            </div>

            <div className="input-box">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                name="password"
                onChange={onChangeInput}
                value={user.password}
              />
            </div>
          </div>
          <div className="button-container">
            <button type="submit">Login</button>
            
          </div>
        </form>
      </div>
    </div>
  )
  
}

export default UserLogin;