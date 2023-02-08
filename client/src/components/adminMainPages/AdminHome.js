import React from "react";
import "./adminHome.css";
//import { Link } from "react-router-dom";
import {Box,Link,Grid} from '@mui/material'


const AdminHome = () => {
  return (
    // <div className="adminhome" style={{backgroundColor:"#2F2F2F"}}>
    <Grid container my={2} spacing={10} marginLeft={'3rem'} marginRight={'3rem'} marginBottom={'3rem'} backgroundColor={'#2F2F2F'}>
      <Grid item xs={12} sm={6}>
      <Link href="/addTutor" style={{ textDecoration: "none" }}>
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
        }}}>ADD A TUTOR</Box></Link>
      </Grid>
      <Grid item xs={12} sm={6}>
      <Link href="/userApprovals" style={{ textDecoration: "none" }}>
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
        }}}>approvals</Box></Link>
      </Grid>
      <Grid item xs={12} sm={6}>
      <Link href="/addStudent" style={{ textDecoration: "none" }}>
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
        }}}>ADD A STUDENT</Box></Link>

      </Grid>
      <Grid item xs={12} sm={6}>
      <Link href="/adminTutor" style={{ textDecoration: "none" }}>
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
        }}}>TUTORS</Box></Link>
      </Grid>
      <Grid item xs={12} sm={6}>
      <Link href="/adminStudent" style={{ textDecoration: "none" }}>
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
        }}}>STUDENTS</Box></Link>
      </Grid>
      <Grid item xs={12} sm={6}>
      <Link href="/adminPayment" style={{ textDecoration: "none" }}>
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
        }}}>PAYMENT</Box></Link>
      </Grid>
      <Grid item xs={12} sm={6}>
      <Link href="/adminProfile" style={{ textDecoration: "none" }}>
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
    // </div>
  )
}

export default AdminHome;
