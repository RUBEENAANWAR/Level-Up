import {useState,useEffect} from 'react'
import axios from 'axios'


function TutorAPI(token){
    const[isTutorLogged,setIsTutorLogged]=useState(false)
    const[isTutor,setIsTutor]=useState(false)
    const[tutorDetails,setTutorDetails]=useState(false)

useEffect(()=>{
    if(token){
        const getTutor=async ()=>{
            try{
                const res=await axios.get('/tutor/refresh_token') 
         
                setTutorDetails(res.data.tutorDetails)
                setIsTutorLogged(true)
                 res.data.tutorDetails.role==="tutor" ? setIsTutor(true) : setIsTutor(false)
                // console.log(res,"data");
               
            } catch(err){
                //swal.fire(err.response.data.msg)
                console.log(err.response.data.msg);
            }
        }
        getTutor()
    }
},[token])

return {
    isTutorLogged: [isTutorLogged,setIsTutorLogged],
    isTutor:[isTutor,setIsTutor],
    tutorDetails
}
}

export default TutorAPI;