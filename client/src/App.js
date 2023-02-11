import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import { DataProvider } from './GlobalState';
import Header from './components/headers/Header';
//import UserHeader from './components/headers/userHeader';
import MainPages from './components/adminMainPages/Pages'
import {Box} from '@mui/material';
// import UserHome from './components/userMainPages/UserHome';



function App() {
  return (
    <Box width="400px" sx={{width:{xl: '1488 px'}}} m="auto">
    <DataProvider>
      <Router>
    <div className="App">
      <Header/>
      <MainPages/>
       {/* <UserHome/>  */}
      
    </div>
    </Router>
    </DataProvider>
    </Box>
  );
}

export default App;
