import React from 'react'
import {Route,Routes} from 'react-router-dom'
import AdminLogin from './adminAuth/AdminLogin'
import AdminRegister from './adminAuth/AdminRegister'
import NotFound from './utils/not_found/NotFound'
import AdminHome from './AdminHome'
function MainPages() {
  return (
    <Routes>
      <Route path="/adminHome" exact element={<AdminHome/>}/>
      <Route path="/adminLogin" exact element={<AdminLogin/>}/>
      <Route path="/adminRegister" exact element={<AdminRegister/>}/>
      <Route path="*" exact element={<NotFound/>}/>

    </Routes>
  )
}

export default MainPages;