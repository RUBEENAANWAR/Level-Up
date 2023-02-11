import React,{useState} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';
import './adminRegister.css';
import swal from 'sweetalert2';

function AdminRegister() {
  const [admin,setAdmin]=useState({
    name:"", email:"",password:""
  })

  const onChangeInput=e=>{
    const {name,value}=e.target;
    setAdmin({...admin,[name]:value})
  }

  const registerSubmit=async e=>{
    e.preventDefault()
    try {
      await axios.post('admin/adminRegister',{...admin})
      localStorage.setItem('firstLogin',true)
      window.location.href='/adminHome';

    } catch (err) {
        swal.fire(err.response.data.msg);
      //alert(err.response.data.msg)
      //console.log(req.cookies);
      
    }
  }   

  return (
    <div className='register-page'>
      <form onSubmit={registerSubmit}>
        <h2 style={{color:"black"}}>Admin Register</h2>
      <input type="text" name="name" 
        placeholder="Name" value={admin.name} onChange={onChangeInput}/>
        <input type="email" name="email" 
        placeholder="Email" value={admin.email} onChange={onChangeInput}/>
         <input type="password" name="password" autoComplete='on'
        placeholder="Password" value={admin.password} onChange={onChangeInput}/>

        <div className='row'>
          <button type='submit'>Register</button>
          <Link to='/adminLogin'>Login</Link>

        </div>
      </form>

    </div>
  )
}

export default AdminRegister