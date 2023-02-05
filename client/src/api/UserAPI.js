import {useState,useEffect} from 'react'
import axios from 'axios'
import swal from 'sweetalert2'

function UserAPI(token){
    const[isLogged,setIsLogged]=useState(false)
    const[isUser,setIsUser]=useState(false)

useEffect(()=>{
    if(token){
        const getUser=async ()=>{
            try{
                const res=await axios.get('/user/refresh_token') 
                console.log(res,"res");   
                
                //console.log(token,"this is token");
                setIsLogged(true)
                 res.data.role==="user" ? setIsUser(true) : setIsUser(false)
                // console.log(res,"data");
               
            } catch(err){
                swal.fire(err.response.data.msg)
            }
        }
        getUser()
    }
},[token])

return {
    isLogged: [isLogged,setIsLogged],
    isUser:[isUser,setIsUser]
}
}

export default UserAPI;