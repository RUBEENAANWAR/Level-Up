import React,{useState} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';
import './adminRegister.css'

function adminRegister() {
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
      alert(err.response.data.msg)
      //console.log(req.cookies);
      
    }
  }   

  return (
    <div className='register-page'>
      <form onSubmit={registerSubmit}>
        <h2>Admin Register</h2>
      <input type="text" name="name" required
        placeholder="Name" value={admin.name} onChange={onChangeInput}/>
        <input type="email" name="email" required
        placeholder="Email" value={admin.email} onChange={onChangeInput}/>
         <input type="password" name="password" required autoComplete='on'
        placeholder="Password" value={admin.password} onChange={onChangeInput}/>

        <div className='row'>
          <button type='submit'>Register</button>
          <Link to='/adminLogin'>Login</Link>

        </div>
      </form>

    </div>
  )
}

export default adminRegister