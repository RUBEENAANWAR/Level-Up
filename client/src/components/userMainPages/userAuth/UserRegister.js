import React,{useState} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';
import './userRegister.css';
import swal from 'sweetalert2';

function UserRegister() {
  const [user,setUser]=useState({
    name:"", email:"",password:""
  })

  const onChangeInput=e=>{
    const {name,value}=e.target;
    setUser({...user,[name]:value})
  }

  const registerSubmit=async e=>{
    e.preventDefault()
    try {
      await axios.post('user/userRegister',{...user})
      localStorage.setItem('firstLogin',true)
      window.location.href='/userHome';

    } catch (err) {
        swal.fire(err.response.data.msg);
      //alert(err.response.data.msg)
      //console.log(req.cookies);
      
    }
  }   

  return (
    <div className='register-page'>
      <form onSubmit={registerSubmit}>
        <h2>User Register</h2>
      <input type="text" name="name" 
        placeholder="Name" value={user.name} onChange={onChangeInput}/>
        <input type="email" name="email" 
        placeholder="Email" value={user.email} onChange={onChangeInput}/>
         <input type="password" name="password" autoComplete='on'
        placeholder="Password" value={user.password} onChange={onChangeInput}/>

        <div className='row'>
          <button type='submit'>Register</button>
          <Link to='/userLogin'>Login</Link>

        </div>
      </form>

    </div>
  )
}

export default UserRegister