import React from "react";
import "./StudentHome.css";
//import { Link } from "react-router-dom";
import {Box,Link,Grid} from '@mui/material'
import studentImage from '../headers/icon/pic.jpg' 


const StudentHome = () => {
  return (
    <div
      // style={{
      //   backgroundImage: `url(${studentImage})`,
      //   backgroundSize: 'cover',
      //   height: '100vh',
      // }}
    >
      {/* Your content here */}
  
   <div className="adminhome">
    <Grid container my={2} spacing={10} marginLeft={'3rem'} marginRight={'3rem'} marginBottom={'3rem'}   style={{
        backgroundImage: `url(${studentImage})`,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',        
        backgroundSize: "cover",
        backgroundRepeat: 'no-repeat',
        flexWrap: 'wrap',
        width: '100%',
        backgroundColor:"rgb(128 188 187)"
      }} >
      <Grid item xs={12} sm={6}>
      <Link href="/subjectsSelected" style={{ textDecoration: "none" }}>
        <Box sx={{
        backgroundColor:'#D96846',
        color:'white',
        borderRadius:'2rem',
        height:'8rem',
        width:'20rem',
        padding:'3rem',
        textAlign:'center',
        cursor:'pointer',
        '&:hover':{
          backgroundColor:'#596235',
        }}}>SUBJECTS SELECTED</Box></Link>
      </Grid>
      <Grid item xs={12} sm={6}>
      <Link href="/userAttendance" style={{ textDecoration: "none" }}>
        <Box sx={{
        backgroundColor:'#D96846',
        color:'white',
        borderRadius:'2rem',
        height:'8rem',
        width:'20rem',
        padding:'3rem',
        textAlign:'center',
        cursor:'pointer',
        '&:hover':{
          backgroundColor:'#596235',
        }}}>ATTENDANCE</Box></Link>
      </Grid>
      <Grid item xs={12} sm={6}>
      <Link href="/selectedTutors" style={{ textDecoration: "none" }}>
      <Box sx={{
        backgroundColor:'#D96846',
        color:'white',
        borderRadius:'2rem',
        height:'8rem',
        width:'20rem',
        padding:'3rem',
        cursor:'pointer',
        textAlign:'center',
        '&:hover':{
          backgroundColor:'#596235',
        }}}>SELECTED TUTORS</Box></Link>

      </Grid>
      <Grid item xs={12} sm={6}>
      <Link href="/userAssignment" style={{ textDecoration: "none" }}>
      <Box sx={{
        backgroundColor:'#D96846',
        color:'white',
        borderRadius:'2rem',
        height:'8rem',
        width:'20rem',
        cursor:'pointer',
        padding:'3rem',
        textAlign:'center',
        '&:hover':{
          backgroundColor:'#596235',
        }}}>ASSIGNMENT</Box></Link>
      </Grid>
      <Grid item xs={12} sm={6}>
      <Link href="/userProgressReport" style={{ textDecoration: "none" }}>
      <Box sx={{
        backgroundColor:'#D96846',
        color:'white',
        borderRadius:'2rem',
        height:'8rem',
        width:'20rem',
        padding:'3rem',
        cursor:'pointer',
        textAlign:'center',
        '&:hover':{
          backgroundColor:'#596235',
        }}}>PROGRESS REPORT</Box></Link>
      </Grid>
      <Grid item xs={12} sm={6}>
      <Link href="/joinTheClass" style={{ textDecoration: "none" }}>
      <Box sx={{
        backgroundColor:'#D96846',
        color:'white',
        borderRadius:'2rem',
        height:'8rem',
        width:'20rem',
        cursor:'pointer',
        padding:'3rem',
        textAlign:'center',
        '&:hover':{
          backgroundColor:'#596235',
        }}}>CLICK TO JOIN IN THE CLASS</Box></Link>
      </Grid>
      <Grid item xs={12} sm={6}>
      <Link href="/userProfile" style={{ textDecoration: "none" }}>
      <Box sx={{
        backgroundColor:'#D96846',
        color:'white',
        borderRadius:'2rem',
        height:'8rem',
        width:'20rem',
        cursor:'pointer',
        padding:'3rem',
        textAlign:'center',
        '&:hover':{
          backgroundColor:'#596235',
        }}}>PROFILE</Box></Link>
      </Grid>
    </Grid>
     </div>
    </div>
  )
}

export default StudentHome;
