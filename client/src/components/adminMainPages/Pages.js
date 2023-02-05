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
import {GlobalState} from '../../GlobalState'

function MainPages() {
  const state=useContext(GlobalState)
  const [isLogged]=state.adminAPI.isLogged
  const [isAdmin]=state.adminAPI.isAdmin
  const [isUser]=state.userAPI.isUser

  return (
    <Routes>
      {isAdmin}
      <Route path="/adminHome" exact element={isLogged ? <AdminHome/>:<NotFound/>}/>
      <Route path="/adminLogin" exact element={isLogged ? <NotFound/>:<AdminLogin/>}/>
      <Route path="/adminRegister" exact element={isLogged ? <NotFound/>:<AdminRegister/>}/>
      <Route path="*" exact element={<NotFound/>}/>
      <Route path="/addStudent" exact element={isLogged ? <AddStudent/>:<NotFound/>}/>
      <Route path="/addTutor" exact element={isLogged ? <AddTutor/>:<NotFound/>}/>
      <Route path="/adminStudent" exact element={isLogged ? <AdminStudent/>:<NotFound/>}/>
      <Route path="/adminTutor" exact element={isLogged ? <AdminTutor/>:<NotFound/>}/>
      <Route path="/adminProfile" exact element={isLogged ? <AdminProfile/>:<NotFound/>}/>
      <Route path="/adminPayment" exact element={isLogged ? <AdminPayment/>:<NotFound/>}/>
      <Route path='/userHome' element={<UserHome/>}/>
      <Route path='/userRegister' element={<UserRegister/>}/>
      <Route path='/userLogin' element={<UserLogin/>}/>
    </Routes>
  )
}

export default MainPages;