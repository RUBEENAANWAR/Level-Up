import React from 'react'
import {Stack,Box,Typography} from '@mui/material'
import BannerImg from '../headers/icon/study.webp'

const Banner = () => {
  return (
    <Box sx={{mt:{lg:'212px',xs:'70px'},ml:{sm:'50px'}}}
    position="relative" p="20px">
        <Typography color="#FF2625" fontWeight="600" fontSize="26px">
            Levelup
        </Typography>
        <Typography fontWeight={700} sx={{fontSize:{lg:'44px',xs:'40px'}}}>
            Dont stop until you're <br/> PROUD
        </Typography>
        <Typography fontSize="22px" lineHeight="35px" mb={3}>
            Focus on best, join LevelUp
        </Typography>
        <Stack>
      <a href="#exercises" style={{ marginTop: '45px', textDecoration: 'none', width: '200px', textAlign: 'center', background: '#FF2625', padding: '14px', fontSize: '22px', textTransform: 'none', color: 'white', borderRadius: '4px' }}>Explore Exercises</a>
    </Stack>
        {/* <Button variant='contained' color='error' href='#courses' sx={{backgroundColor:'#FF2625',padding:'10px'}}>
            EXPLORE COURSES
        </Button> */}
        <img src={BannerImg} alt="banner" className='banner-img' style={{display: 'flex',
    margin: '0 auto',
    textAlign: 'center'}}/>
    </Box>
  )
}

export default Banner