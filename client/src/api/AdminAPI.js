import {useState,useEffect} from 'react'
import axios from 'axios'
import swal from 'sweetalert2'

function AdminAPI(token){
    const[isLogged,setIsLogged]=useState(false)
    const[isAdmin,setIsAdmin]=useState(false)

useEffect(()=>{
    if(token){
        const getAdmin=async ()=>{
            try{
                const res=await axios.get('/admin/refresh_token') 
                console.log(res,"res");   
                
                //console.log(token,"this is token");
                setIsLogged(true)
                 res.data.adminDetails.role==="admin" ? setIsAdmin(true) : setIsAdmin(false)
                // console.log(res,"data");
               
            } catch(err){
                swal.fire(err.response.data.msg)
            }
        }
        getAdmin()
    }
},[token])

  const userPendingApprovals=async(token)=>{
    const {data}=await axios.get("/admin/pendingApprovals")
    if(data.status){
        return data;
    }
   }
   const userApprove=async (token,consId)=>{
    const {data}=await axios.get(`/userApprove/${consId}`)
    if(data.status){
        return data;
    }
   }

return {
    isLogged: [isLogged,setIsLogged],
    isAdmin:[isAdmin,setIsAdmin]
}
}

 

export default AdminAPI