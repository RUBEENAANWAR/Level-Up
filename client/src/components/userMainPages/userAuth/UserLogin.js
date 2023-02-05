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
      localStorage.setItem('firstLogin',true)
      window.location.href='/userHome';

    } catch (err) {
         swal.fire(err.response.data.msg);

         //alert(err.response.data.msg)
      //console.log(req.cookies);
      
    }
  }

  return (
    <div className='login-page'>
      <form onSubmit={loginSubmit}>
        <h2>User Login</h2>
        <input type="email" name="email"
        placeholder="Email" value={user.email} onChange={onChangeInput}/>
        
         <input type="password" name="password" autoComplete='on'
        placeholder="Password" value={user.password} onChange={onChangeInput}/>

        <div className='row'>
          <button className='buttonStyle' type='submit'>Login</button>

        </div>
      </form>

    </div>
  )
}

export default UserLogin;