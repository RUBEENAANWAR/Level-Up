import React ,{useState} from 'react'
import axios from 'axios'
import swal from 'sweetalert2'

const TutorLogin = () => {
    const [tutor,setTutor]=useState({
        email:"",password:""
    })

    const onChangeInput=e=>{
        const {name,value}=e.target
        setTutor({...tutor,[name]:value})
    }

    const loginSubmit=async e =>{
        e.preventDefault()
        try{
            await axios.post('/tutor/tutorLogin',{...tutor})
            localStorage.setItem('tutorLogin',true)
            window.location.href='/tutorHome'
        }catch (err){
             swal.fire(err.response.data.msg)
        }
    }
  return (
    <div className="main-container">
    <div className="Container" style={{ marginLeft: "220px" }}>
      <form onSubmit={loginSubmit}>
        <h2>Tutor Login</h2>
        <div className="content">
          <div className="input-box">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={onChangeInput}
              value={tutor.email}
            />
          </div>

          <div className="input-box">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              name="password"
              onChange={onChangeInput}
              value={tutor.password}
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

export default TutorLogin