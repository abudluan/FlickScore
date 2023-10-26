import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './App.css'

import NavigationBar from './components/NavigationBar/NavigationBar';
import Home from './components/Home';
import SelectPage from './components/selectPage/SelectPage';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <>
      <Router>
        <NavigationBar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/filme/:id' element={<SelectPage />} />
          <Route exact path='/serie/:id' element={<SelectPage />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App;
