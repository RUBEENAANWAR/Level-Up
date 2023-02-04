import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import { DataProvider } from './GlobalState';
import Header from './components/headers/AdminHeader';
import MainPages from './components/adminMainPages/Pages'
import {Box} from '@mui/material';


function App() {
  return (
    <Box width="400px" sx={{width:{xl: '1488 px'}}} m="auto">
    <DataProvider>
      <Router>
    <div className="App">
      <Header/>
      <MainPages/>
    </div>
    </Router>
    </DataProvider>
    </Box>
  );
}

export default App;
