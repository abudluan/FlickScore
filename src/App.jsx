import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './App.css'

import ScrollTopRedirect from './components/uti/ScrollTopRedirect';
import BtnScrollToTop from './components/uti/BtnScrollToTop';

import NavigationBar from './components/NavigationBar/NavigationBar';
import Home from './components/Home';
import Filmes from './components/Filmes/Filmes';
import MovieSelect from './components/MovieSelect/MovieSelect';
import SerieSelect from './components/SerieSelect/SerieSelect';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <>
      <Router>
        <BtnScrollToTop />
        <ScrollTopRedirect />
        <NavigationBar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/filmes' element={<Filmes />} />
          <Route exact path='/filme/:id' element={<MovieSelect />} />
          <Route exact path='/serie/:id' element={<SerieSelect />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App;
