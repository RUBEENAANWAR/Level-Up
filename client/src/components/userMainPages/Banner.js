import React from 'react'
import {Stack,Box,Typography,Button} from '@mui/material'
import BannerImg from '../headers/icon/banner.jpg'

const Banner = () => {
  return (
    <Box 
    sx={{mt:{lg:'80px',xs:'30px'},ml:{sm:'50px'},}}
    // position="relative"
     p="20px" display="flex"
     justifyContent="space-around"
     className="user">
      <Box>
        <Typography color="#FF2625" fontWeight="600" fontSize="70px">
        Levelup..<br />Dont stop until you're <br /> PROUD</Typography>
        <Typography fontWeight={700} sx={{fontSize:{lg:'20px',xs:'20px'}}}>
        Focus on best, join LevelUp 
        </Typography>
        <Typography fontSize="22px" lineHeight="35px" mb={2}>
            Join Our Team
        </Typography>
        <Button variant="contained" color="success" href="/tutorRegister">Find Jobs</Button>
      <Button variant="outlined" color="error" style={{ marginLeft: '35px'}} href="/userRegister">Join Us</Button>
        </Box>
        <Box>
        <img src={BannerImg} alt="banner" className='banner-img' width={450} height={600}/>
   
    </Box>
    </Box>

  )
}

export default Banner