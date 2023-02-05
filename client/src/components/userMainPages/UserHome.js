import React from 'react'
// import {Link} from 'react-router-dom';
import { Box } from '@mui/material';
import Banner from '../userMainPages/Banner'
import Courses from '../userMainPages/Courses';
import JoinTeam from '../userMainPages/JoinTeam';
import JoinStudents from '../userMainPages/JoinStudents';

const UserHome = () => {
  return (
    <Box>
        <Banner/>
        <Courses/>
        <JoinStudents/>
        <JoinTeam/>   
    </Box>
  )
}

export default UserHome