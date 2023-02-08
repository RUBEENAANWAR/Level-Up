import React,{useState} from 'react';
import axios from 'axios'
import './adminLogin.css';
import swal from 'sweetalert2';

function AdminLogin() {
  const [admin,setAdmin]=useState({
    email:"",password:""
  })

  const onChangeInput=e=>{
    const {name,value}=e.target;
    setAdmin({...admin,[name]:value})
  }

  const loginSubmit=async e=>{
    e.preventDefault()
    try {
      await axios.post('/admin/adminLogin',{...admin})
      localStorage.setItem('firstLogin',true)
      window.location.href='/adminHome';

    } catch (err) {
         swal.fire(err.response.data.msg);

         //alert(err.response.data.msg)
      //console.log(req.cookies);
      
    }
  }

  return (
    <div className='login-page'>
      <form onSubmit={loginSubmit}>
        <h2 style={{color:"black" ,textAlign:"center"}}>Admin Login</h2>
        <input type="email" name="email"
        placeholder="Email" value={admin.email} onChange={onChangeInput}/>
        
         <input type="password" name="password" autoComplete='on'
        placeholder="Password" value={admin.password} onChange={onChangeInput}/>

        <div className='row'>
          <button className='buttonStyle' type='submit'>Login</button>

        </div>
      </form>

    </div>
  )
}

export default AdminLogin;