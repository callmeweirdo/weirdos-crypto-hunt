import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import AliceCarousel from "react-alice-carousel";


// ? components imports
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CoinPage from './pages/CoinPage';

// ? styles import
import { colors, makeStyles } from '@material-ui/core';


const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: '#14161a',
      color: 'white',
      minHeight: '100vh'
    }
}))

function App() {

  const classes = useStyles();

  return (

      <div className={classes.App}>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/coins/:id' element={<CoinPage />} />
        </Routes>
      </div>
  );
}

export default App;
