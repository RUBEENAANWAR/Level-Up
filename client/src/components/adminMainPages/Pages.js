import React,{useContext} from 'react'
import {Route,Routes} from 'react-router-dom'
import AdminLogin from './adminAuth/AdminLogin'
import AdminRegister from './adminAuth/AdminRegister'
import NotFound from './utils/not_found/NotFound'
import AdminHome from './AdminHome'
import AddTutor from './adminPages/AddTutor'
import AddStudent from './adminPages/AddStudent'
import AdminTutor from './adminPages/AdminTutor'
import AdminStudent from './adminPages/AdminStudent'
import AdminProfile from './adminPages/AdminProfile'
import AdminPayment from './adminPages/AdminPayment'
import UserHome from '../userMainPages/UserHome'
import UserRegister from '../userMainPages/userAuth/UserRegister'
import UserLogin from '../userMainPages/userAuth/UserLogin'
import TutorLogin from '../tutorMainPages/tutorAuth/TutorLogin'
import TutorRegister from '../tutorMainPages/tutorAuth/TutorRegister'
import TutorHome from '../tutorMainPages/TutorHome' 
import {GlobalState} from '../../GlobalState'
import UserApproval from './adminPages/UserApproval'
import TutorApproval from './adminPages/TutorApproval'
import StudentDetails from '../tutorMainPages/StudentDetails'
import AdminEditUser from '../adminMainPages/adminPages/adminUserUpdate/AdminEditUser'
import TutorProfile from '../tutorMainPages/tutorProfile/TutorProfile'
import StudentHome from '../userMainPages/StudentHome'
import UserProfile from '../userMainPages/userProfile/UserProfile'
 

function MainPages() {
  const state=useContext(GlobalState)
  const [isLogged]=state.adminAPI.isLogged
  const [isAdmin]=state.adminAPI.isAdmin
  const [isUser]=state.userAPI.isUser
  //const [isUserLogged]=state.adminAPI.isUserLogged
  const [isTutor]=state.tutorAPI.isTutor
  //const [isTutorLogged]=state.tutorAPI.isTutorLogged


  return (
    <Routes>
      <Route path="/adminHome" exact element={isLogged ? <AdminHome/>:<NotFound/>}/>
      <Route path="/userApprovals" exact element={ <UserApproval/>}/>
      <Route path="/tutorApprovals" exact element={ <TutorApproval/>}/>
      <Route path="/adminLogin" exact element={isLogged ? <NotFound/>:<AdminLogin/>}/>
      <Route path="/adminRegister" exact element={isLogged ? <NotFound/>:<AdminRegister/>}/>
      <Route path="/addStudent" exact element={isLogged ? <AddStudent/>:<NotFound/>}/>
      <Route path="/addTutor" exact element={isLogged ? <AddTutor/>:<NotFound/>}/>
      <Route path="/adminStudent" exact element={isLogged ? <AdminStudent/>:<NotFound/>}/>
      <Route path="/adminTutor" exact element={isLogged ? <AdminTutor/>:<NotFound/>}/>
      <Route path="/adminProfile" exact element={isLogged ? <AdminProfile/>:<NotFound/>}/>
      <Route path="/adminPayment" exact element={isLogged ? <AdminPayment/>:<NotFound/>}/>
      <Route exact path="/adminEditUser/:id" element={isAdmin && isLogged? <AdminEditUser/>:<NotFound/>} />
      <Route exact path="/studentHome" element={<StudentHome/>}/>

      <Route path="*" exact element={<NotFound/>}/>

      <Route path='/userHome' exact element={<UserHome/>}/>
      <Route path='/userRegister' exact element={isUser ?<NotFound/>:<UserRegister/>}/>
      <Route path='/userLogin' exact element={isUser ?<NotFound/>:<UserLogin/>}/>
      <Route path="userProfile" exact element={<UserProfile/>}/>


      <Route path='/tutorLogin' exact element={isTutor ?<NotFound/>:<TutorLogin/>}/>
      <Route path='/tutorRegister' exact element={isTutor ?<NotFound/>:<TutorRegister/>}/>
      <Route path='/tutorHome' exact element={<TutorHome/>}/>
      <Route path="/tutorProfile" exact element={<TutorProfile/>}/>
      <Route path='/studentDetails' exact element={<StudentDetails/>}/>
       
    </Routes>
  )
}

export default MainPages;