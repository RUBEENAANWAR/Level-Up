import React from "react";
import "./tutorHome.css";
//import { Link } from "react-router-dom";
import {Box,Link,Grid} from '@mui/material'


const TutorHome = () => {
  return (
    // <div className="adminhome" style={{backgroundColor:"#2F2F2F"}}>
    <Grid container my={2} spacing={10} marginLeft={'3rem'} marginRight={'3rem'} marginBottom={'3rem'} backgroundColor={'#1c2c3b'}>
      <Grid item xs={12} sm={6}>
      <Link href="/ListOfStudents" style={{ textDecoration: "none" }}>
        <Box sx={{
        backgroundColor:'#596235',
        color:'white',
        borderRadius:'2rem',
        height:'8rem',
        width:'20rem',
        padding:'3rem',
        textAlign:'center',
        cursor:'pointer',
        '&:hover':{
          backgroundColor:'#32a834',
        }}}>LIST OF STUDENTS & TIMING</Box></Link>
      </Grid>
      <Grid item xs={12} sm={6}>
      <Link href="/totalhours" style={{ textDecoration: "none" }}>
        <Box sx={{
        backgroundColor:'#596235',
        color:'white',
        borderRadius:'2rem',
        height:'8rem',
        width:'20rem',
        padding:'3rem',
        textAlign:'center',
        cursor:'pointer',
        '&:hover':{
          backgroundColor:'#32a834',
        }}}>TOTAL HOURS HANDLED</Box></Link>
      </Grid>
      <Grid item xs={12} sm={6}>
      <Link href="/startNewClass" style={{ textDecoration: "none" }}>
      <Box sx={{
        backgroundColor:'#596235',
        color:'white',
        borderRadius:'2rem',
        height:'8rem',
        width:'20rem',
        padding:'3rem',
        cursor:'pointer',
        textAlign:'center',
        '&:hover':{
          backgroundColor:'#32a834',
        }}}>START A NEW CLASS</Box></Link>

      </Grid>
      <Grid item xs={12} sm={6}>
      <Link href="/attendance" style={{ textDecoration: "none" }}>
      <Box sx={{
        backgroundColor:'#596235',
        color:'white',
        borderRadius:'2rem',
        height:'8rem',
        width:'20rem',
        cursor:'pointer',
        padding:'3rem',
        textAlign:'center',
        '&:hover':{
          backgroundColor:'#32a834',
        }}}>ATTENDANCE</Box></Link>
      </Grid>
      <Grid item xs={12} sm={6}>
      <Link href="/studentAssignments" style={{ textDecoration: "none" }}>
      <Box sx={{
        backgroundColor:'#596235',
        color:'white',
        borderRadius:'2rem',
        height:'8rem',
        width:'20rem',
        padding:'3rem',
        cursor:'pointer',
        textAlign:'center',
        '&:hover':{
          backgroundColor:'#32a834',
        }}}>STUDENTS ASSIGNMENTS</Box></Link>
      </Grid>
      <Grid item xs={12} sm={6}>
      <Link href="/studentDetails" style={{ textDecoration: "none" }}>
      <Box sx={{
        backgroundColor:'#596235',
        color:'white',
        borderRadius:'2rem',
        height:'8rem',
        width:'20rem',
        cursor:'pointer',
        padding:'3rem',
        textAlign:'center',
        '&:hover':{
          backgroundColor:'#32a834',
        }}}>STUDENT DETAILS</Box></Link>
      </Grid>
      <Grid item xs={12} sm={6}>
      <Link href="/tutorProfile" style={{ textDecoration: "none" }}>
      <Box sx={{
        backgroundColor:'#596235',
        color:'white',
        borderRadius:'2rem',
        height:'8rem',
        width:'20rem',
        cursor:'pointer',
        padding:'3rem',
        textAlign:'center',
        '&:hover':{
          backgroundColor:'#32a834',
        }}}>PROFILE</Box></Link>
      </Grid>
    </Grid>
    // </div>
  )
}

export default TutorHome;
