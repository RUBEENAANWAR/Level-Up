import React from "react";
import "./tutorHome.css";
//import { Link } from "react-router-dom";
import {Box,Link,Grid} from '@mui/material'
import tutorImage from '../../headers/icon/Screen_Shot_2020-09-09_at_2.00.46_PM.png'


const TutorHome = () => {
  return (
    <div className="tutorhome">
   
    <Grid container my={2} spacing={10} marginLeft={'3rem'} marginRight={'3rem'} marginBottom={'3rem'} backgroundColor={'#ebebe8'} style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',        
      backgroundSize: "contain",
      backgroundRepeat: 'no-repeat',
      flexWrap: 'wrap',
      width: '100%',
      backgroundColor:"#ebebe8"
    }}>
      <Grid item xs={12} sm={6}>
      <Link href="/studentTimeTable" style={{ textDecoration: "none" }}>
        <Box sx={{
        backgroundColor:'#171717',
        color:'white',
        borderRadius:'2rem',
        height:'8rem',
        width:'20rem',
        padding:'3rem',
        textAlign:'center',
        cursor:'pointer',
        '&:hover':{
          backgroundColor:'#F9a602',
        }}}>Time Table</Box></Link>
      </Grid>
      <Grid item xs={12} sm={6}>
      <Link href="/studentMarks" style={{ textDecoration: "none" }}>
        <Box sx={{
        backgroundColor:'#171717',
        color:'white',
        borderRadius:'2rem',
        height:'8rem',
        width:'20rem',
        padding:'3rem',
        textAlign:'center',
        cursor:'pointer',
        '&:hover':{
          backgroundColor:'#F9a602',
        }}}>Student Marks</Box></Link>
      </Grid>
      
      <Grid item xs={12} sm={6}>
      <Link href="/startNewClass" style={{ textDecoration: "none" }}>
      <Box sx={{
        backgroundColor:'#171717',
        color:'white',
        borderRadius:'2rem',
        height:'8rem',
        width:'20rem',
        padding:'3rem',
        cursor:'pointer',
        textAlign:'center',
        '&:hover':{
          backgroundColor:'#F9a602',
        }}}>START A NEW CLASS</Box></Link>

      </Grid>
      <Grid item xs={12} sm={6}>
      <Link href="/attendance" style={{ textDecoration: "none" }}>
      <Box sx={{
        backgroundColor:'#171717',
        color:'white',
        borderRadius:'2rem',
        height:'8rem',
        width:'20rem',
        cursor:'pointer',
        padding:'3rem',
        textAlign:'center',
        '&:hover':{
          backgroundColor:'#F9a602',
        }}}>ATTENDANCE</Box></Link>
      </Grid>
      <Grid item xs={12} sm={6}>
      <Link href="/studentAssignments" style={{ textDecoration: "none" }}>
      <Box sx={{
        backgroundColor:'#171717',
        color:'white',
        borderRadius:'2rem',
        height:'8rem',
        width:'20rem',
        padding:'3rem',
        cursor:'pointer',
        textAlign:'center',
        '&:hover':{
          backgroundColor:'#F9a602',
        }}}>STUDENTS ASSIGNMENTS</Box></Link>
      </Grid>
      <Grid item xs={12} sm={6}>
      <Link href="/studentDetails" style={{ textDecoration: "none" }}>
      <Box sx={{
        backgroundColor:'#171717',
        color:'white',
        borderRadius:'2rem',
        height:'8rem',
        width:'20rem',
        cursor:'pointer',
        padding:'3rem',
        textAlign:'center',
        '&:hover':{
          backgroundColor:'#F9a602',
        }}}>STUDENT DETAILS</Box></Link>
      </Grid>
      <Grid item xs={12} sm={6}>
      <Link href="/tutorProfile" style={{ textDecoration: "none" }}>
      <Box sx={{
        backgroundColor:'#171717',
        color:'white',
        borderRadius:'2rem',
        height:'8rem',
        width:'20rem',
        cursor:'pointer',
        padding:'3rem',
        textAlign:'center',
        '&:hover':{
          backgroundColor:'#F9a602',
        }}}>PROFILE</Box></Link>
      </Grid>
    </Grid>
    // </div>
  )
}

export default TutorHome;
