import React,{useState,useContext,useEffect} from 'react';
import { GlobalState } from '../../../GlobalState';
import axios from 'axios';
import NotFound from '../utils/not_found/NotFound'
import swal from 'sweetalert2';
import ProfPic from '../../headers/icon/profpic.png'
import './adminprof.css'

const AdminProfile = () => {
  const state=useContext(GlobalState)

const [isLogged,setIsLogged]=state.adminAPI.isLogged
const [isAdmin,setIsAdmin]=state.adminAPI.isAdmin
const[adminDetails,setAdminDetails]=useState({})

function LoggedRouter(){
     const GetAdmin=async()=>{
      try{
        const res=await axios.get('/admin/refresh_token')
        console.log("resDetails",res.data.adminDetails);
        setAdminDetails(res.data.adminDetails)
      }catch(err){
        console.log("error msg",err.response.data.msg);
           swal.fire(err.response.data.msg)
      }
     }
     useEffect(()=>{
      GetAdmin()
     },[])

  return (
    
    <div>
    <div className="container emp-profile">
      <form>
        <div className="row">
          <div className="col-md-4">
            <div className="profile-img">
              <img
                src ={ProfPic} style={{width:"8rem",height:"8rem"}}
                alt=""
              />
              <div className="change btn-primary">
                Change Photo
                <input type="file" name="file" />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <input
              type="button"
              className="btn btn-primary"
              value="Edit Profile"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="tab-content profile-tab" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab">
                <div className="row">
                  <div className="col-md-6">
                    <label>Name</label>
                  </div>
                  <div className="col-md-6">
                    <p>
                      {adminDetails?.name}
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Gender</label>
                  </div>
                  
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Email</label>
                  </div>
                  <div className="col-md-6">
                    <p>{adminDetails?.email}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Phone</label>
                  </div>
                  <div className="col-md-6">
                    <p>{adminDetails?.mobile}</p>
                  </div>
                </div>
               </div>
               <div
                className="tab-pane fade"
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab" >
                <div className="row">
                  <div className="col-md-6">
                    <label>Experience</label>
                  </div>
                  <div className="col-md-6">
                    <p>Expert</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <label>Your Bio</label>
                    <br />
                    <p>Your detail description</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>

  )
}

return(
  <>
  {isAdmin}{
    isLogged ? LoggedRouter(): NotFound()
  }
  </>
)
}



export default AdminProfile