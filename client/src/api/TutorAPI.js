import {useState,useEffect} from 'react'
import axios from 'axios'
import swal from 'sweetalert2'

function TutorAPI(token){
    const[isTutorLogged,setIsTutorLogged]=useState(false)
    const[isTutor,setIsTutor]=useState(false)

useEffect(()=>{
    if(token){
        const getTutor=async ()=>{
            try{
                const res=await axios.get('/tutor/refresh_token') 
                console.log(res,"res");   
                
                //console.log(token,"this is token");
                setIsTutorLogged(true)
                 res.data.tutorDetails.role==="tutor" ? setIsTutor(true) : setIsTutor(false)
                // console.log(res,"data");
               
            } catch(err){
                swal.fire(err.response.data.msg)
            }
        }
        getTutor()
    }
},[token])

return {
    isTutorLogged: [isTutorLogged,setIsTutorLogged],
    isTutor:[isTutor,setIsTutor]
}
}

export default TutorAPI;