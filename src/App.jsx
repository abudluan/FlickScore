import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './App.css'

import ScrollTopRedirect from './components/uti/ScrollTopRedirect';

import NavigationBar from './components/NavigationBar/NavigationBar';
import Home from './components/Home';
import MovieSelect from './components/MovieSelect/MovieSelect';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <>
      <Router>
        <ScrollTopRedirect />
        <NavigationBar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/filme/:id' element={<MovieSelect />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App;
