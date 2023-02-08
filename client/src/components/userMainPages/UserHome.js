import React,{useState,useContext,useEffect} from 'react'
import {GlobalState} from '../../GlobalState' 
import axios from 'axios'
import NotFound from '../adminMainPages/utils/not_found/NotFound'
import swal from 'sweetalert2'
// import {Link} from 'react-router-dom';
import { Box } from '@mui/material';
import Banner from '../userMainPages/Banner'
import Courses from '../userMainPages/Courses';
import JoinTeam from '../userMainPages/JoinTeam';
import JoinStudents from '../userMainPages/JoinStudents';


const UserHome = () => {

  const state=useContext(GlobalState)
  const [isUserLogged,setIsUserLogged]=state.userAPI.isUserLogged
  const [isUser,setIsUser]=state.userAPI.isUser
  //const [userDetails,setUserDetails]=useState({})

  function LoggedRouter(){
    // const GetUser=async()=>{
    //   try{
    //     const res=await axios.get('/user/refresh_token')
    //     console.log("userDetails",res.data.userDetails);
    //     setUserDetails(res.data.userDetails)
    //   }catch(err){
    //     console.log('errormsg', err.response.data.msg);
    //     swal.fire(err.response.data.msg)
    //   }
    // }
    // useEffect(()=>{
    //   GetUser()
    // },[])

  return (
    <Box>
        <Banner/>
        <Courses/>
        <JoinStudents/>
        <JoinTeam/>   
    </Box>
  )
}

return(
  <>
  {isUser && isUserLogged ? LoggedRouter() : NotFound()}
  </>
)
}
export default UserHome