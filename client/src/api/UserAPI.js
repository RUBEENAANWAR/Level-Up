import {useState,useEffect} from 'react'
import axios from 'axios'
import swal from 'sweetalert2'

function UserAPI(token){
    const[isUserLogged,setIsUserLogged]=useState(false)
    const[isUser,setIsUser]=useState(false)

useEffect(()=>{
    if(token){
        const getUser=async ()=>{
            try{
                const res=await axios.get('/user/refresh_token') 
                console.log(res,"res");   
                
                //console.log(token,"this is token");
                setIsUserLogged(true)
                 res.data.userDetails.role==="user" ? setIsUser(true) : setIsUser(false)
                // console.log(res,"data");
               
            } catch(err){
                swal.fire(err.response.data.msg)
            }
        }
        getUser()
    }
},[token])

return {
    isUserLogged: [isUserLogged,setIsUserLogged],
    isUser:[isUser,setIsUser]
}
}

export default UserAPI;